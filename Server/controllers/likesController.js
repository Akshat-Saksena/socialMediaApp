import mongoose from "mongoose";
import { Like } from "../models/likesModel.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(400).json("Token Expired");
    }

    const { id } = req.query;
    if (!id) return res.status(400).json("Post id invalid");

    const likes = await Like.find({
      postId: new mongoose.Types.ObjectId(id + ""),
    });

    const liked = await Like.exists({
      userId: currentUser,
      postId: new mongoose.Types.ObjectId(id + ""),
    });

    res.status(200).json({ number: likes.length, liked: liked });
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
};

export const addLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(400).json("Token Expired");
    }

    const like = new Like({
      userId: currentUser,
      postId: new mongoose.Types.ObjectId(req.body.postId + ""),
    });

    await like.save();

    const io = req.app.get("io");
    io.emit("changeLike", req.body.postId);

    res.status(200).json("Like added");
  } catch (err) {
    res.status(400).json("message: " + err.message);
    console.log(err);
  }
};

export const removeLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      return res.status(400).json("Token Expired");
    }

    const postId = req.query;

    await Like.deleteOne({
      userId: currentUser,
      postId: new mongoose.Types.ObjectId(postId.id + ""),
    });

    const io = req.app.get("io");
    io.emit("changeLike", postId.id);

    res.status(200).json("Like removed");
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
};
