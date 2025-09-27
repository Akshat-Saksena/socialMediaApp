import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const searchSuggestion = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    const userInfo = jwt.verify(token, "secretKey");
    if (!userInfo) return res.status(400).json("Token expired");

    const { query } = req.query;
    if (!query) return res.status(200).json();

    const users = await User.find({
      name: { $regex: query, $options: "i" },
    })
      .select("name userName profilePic -_id")
      .limit(10);

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

export const searchFull = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("Not logged in");

    const userInfo = jwt.verify(token, "secretKey");
    if (!userInfo) return res.status(400).json("Token expired");

    const { query } = req.query;
    if (!query) return res.status(200).json();

    const users = await User.find({
      name: { $regex: query, $options: "i" },
    })
      .select("name userName profilePic -_id")
      .limit(20);

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
