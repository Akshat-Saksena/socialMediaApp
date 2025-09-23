import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

export const getUser = async (req, res) => {
  try {
    const user_name = req.params.userName;
    if (!user_name) return res.status(400).json("No user passed");

    const user = await User.findOne({ userName: user_name }).lean();
    if (!user) return res.status(500).json("User does not exists");

    const { _id, password, ...info } = user;
    res.status(200).json(info);
  } catch (err) {
    console.log("\nError:" + err + "\n");
    res.status(400).json(err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(400).json("not logged in");

    let currentUser;
    try {
      const userInfo = jwt.verify(token, "secretKey");
      currentUser = await User.findById(userInfo._id).lean();
      console.log(currentUser + "\n");
    } catch (err) {
      console.log("\nError : " + err + "\n");
      return res.status(400).json("token expired");
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (req.body.profilePic && currentUser.profilePic) {
      await deleteFile(currentUser.profilePic);
    }

    if (req.body.coverPic && currentUser.coverPic) {
      await deleteFile(currentUser.coverPic);
    }

    const { password, _id, ...rest } = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    ).lean();

    res.status(200).json(rest);
  } catch (err) {
    console.log("\nError : " + err + "\n");
    res.status(500).json(err.message);
  }
};

const deleteFile = async (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fileName = file.split("/uploads/")[1];
  //console.log("fileName: " + fileName + "\n");
  if (fileName) {
    const filePath = path.join(__dirname, "..", "uploads", fileName);
    //console.log("filePath: " + filePath + "\n");
    try {
      await fs.unlink(filePath);
    } catch (err) {
      //console.log("File not found:", err.message);
    }
  }
};
