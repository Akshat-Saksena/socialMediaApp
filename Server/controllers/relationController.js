import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Relation } from "../models/relationModel.js";

export const follow = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      console.log("\nError : " + err + "\n");
      res.status(400).json("token expired");
    }

    const toFollow = req.body.id;
    if (!toFollow) return res.status(400).json("No user to follow");

    const followId = await User.findOne({ userName: toFollow }).lean();
    if (!followId) return res.status(400).json("User does not exists");

    const relation = new Relation({
      followerId: currentUser,
      followedId: new mongoose.Types.ObjectId(followId._id + ""),
    });

    await relation.save();
    res.status(200).json("user followed!");
  } catch (err) {
    console.log("\nError : " + err + "\n");
    res.status(500).json(err.message);
  }
};

export const unFollow = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      console.log("\nError : " + err + "\n");
      res.status(400).json("token expired");
    }

    const toUnFollow = req.body.id;
    if (!toUnFollow) return res.status(400).json("No user to un-follow");

    const unFollowId = await User.findOne({ userName: toUnFollow }).lean();
    if (!unFollowId) return res.status(400).json("User does not exists");

    await Relation.deleteOne({
      followerId: currentUser,
      followedId: new mongoose.Types.ObjectId(unFollowId._id + ""),
    });

    res.status(200).json("user un-followed!");
  } catch (err) {
    console.log("\nError : " + err + "\n");
    res.status(500).json(err.message);
  }
};

export const getStatus = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = new mongoose.Types.ObjectId(userInfo._id + "");
    } catch (err) {
      console.log("\nError : " + err + "\n");
      res.status(400).json("token expired");
    }

    const toFollow = req.query.id;
    if (!toFollow) return res.status(400).json("No user to follow");

    const followId = await User.findOne({ userName: toFollow }).lean();
    if (!followId) return res.status(400).json("User does not exists");

    const status = await Relation.findOne({
      followerId: currentUser,
      followedId: new mongoose.Types.ObjectId(followId._id + ""),
    });

    if (status) res.status(200).json(true);
    else res.status(200).json(false);
  } catch (err) {
    console.log("\nError : " + err + "\n");
    res.status(500).json(err.message);
  }
};
