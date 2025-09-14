import mongoose from "mongoose";
import { Comment } from "../models/commentModel.js";
import jwt from "jsonwebtoken";

export const getCommments = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json("Invalid post id");

  const currentPostId = new mongoose.Types.ObjectId(id + "");

  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          postId: currentPostId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          createdAt: 1,
          "userInfo.name": 1,
          "userInfo._id": 1,
          "userInfo.profilePic": 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(400).json("Token expired");
    }

    const { createdAt, userId, postId, ...rest } = req.body;
    const comment = new Comment({
      ...rest,
      createdAt: new Date(),
      userId: currentUser,
      postId: new mongoose.Types.ObjectId(postId + ""),
    });

    await comment.save();

    const io = req.app.get("io");
    io.emit("newComment", { postId });

    res.status(200).json("comment added");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
