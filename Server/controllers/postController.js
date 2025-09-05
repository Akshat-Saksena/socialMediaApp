import mongoose from "mongoose";
import { Post } from "../models/postModel.js";
import { Relation } from "../models/relationModel.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(403).json({ message: "Token Expired. Login again" });
    }

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "relations",
          let: { postUserId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$followedId", "$$postUserId"] },
                    { $eq: ["$followerId", currentUser] },
                  ],
                },
              },
            },
          ],
          as: "isFollowing",
        },
      },
      {
        $match: {
          $or: [
            { userId: currentUser },
            { "isFollowing.0": { $exists: true } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          img: 1,
          createdAt: 1,
          "user._id": 1,
          "user.profilePic": 1,
          "user.name": 1,
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
    console.log(err);
  }
};
