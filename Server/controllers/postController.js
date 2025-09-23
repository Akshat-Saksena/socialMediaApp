import mongoose from "mongoose";
import { Post } from "../models/postModel.js";
import { Relation } from "../models/relationModel.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import deleteFile from "../deleteFile.js";

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
          "user.profilePic": 1,
          "user.name": 1,
          "user.userName": 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
    console.log(err);
  }
};

export const addPost = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("not logged in");

    let currUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(403).json("Token expired");
    }

    const { userId, createdAt, ...rest } = req.body;
    const newPost = new Post({
      ...rest,
      userId: currUser,
      createdAt: new Date(),
    });
    await newPost.save();

    const io = req.app.get("io");
    io.emit("newPost");

    res.status(201).json("Post has been added");
  } catch (err) {
    res.status(500).json("Error:" + err);
    console.log("Error:" + err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user_name = req.params.userName;
    if (!user_name) return res.status(400).json("User not passed");

    const user = await User.findOne({ userName: user_name }).lean();
    if (!user) return res.status(500).json("user does not exists");

    const posts = await Post.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          img: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const postsWithUser = posts.map((post) => ({
      ...post,
      user: {
        profilePic: user.profilePic,
        name: user.name,
        userName: user.userName,
      },
    }));

    res.status(200).json(postsWithUser);
  } catch (err) {
    console.log("\nError: " + err + "\n");
    res.status(400).json(err.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      console.log("\nError: " + err + "\nline 170");
      return res.status(400).json("Token expired");
    }

    const postId = new mongoose.Types.ObjectId(req.body.id + "");
    if (!postId) return res.status(400).json("No post to delete");

    const post = await Post.findById(postId).lean();

    if (!post.userId.equals(currentUser)) {
      return res.status(403).json("You can only delete your own post");
    }

    if (post.img) await deleteFile(post.img);

    await Post.deleteOne({ _id: postId });

    const io = req.app.get("io");
    io.emit("newPost");

    res.status(200).json("Post deleted");
  } catch (err) {
    console.log("\nError: " + err + "\nline 191");
    res.status(500).json(err.message);
  }
};
