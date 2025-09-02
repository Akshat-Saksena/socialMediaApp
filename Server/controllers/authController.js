import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName }).lean();
    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ _id: user._id }, "secretKey"); //create env file and hide the secretKey as a variable there.

    const { password, ...rest } = user;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        //secure:true
      })
      .status(200)
      .json(rest);
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};

export const register = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...rest,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    if (err.code === 11000) {
      console.log("Could not register --- Duplicate UserName");
      return res.status(400).json({
        message: "Registration failed",
        error: "UserName already exists",
      });
    }
    res.status(400).json({ message: "Registration failed", error: err });
  }
};
