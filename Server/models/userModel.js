import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  coverPic: String,
  profilePic: String,
  city: String,
  webSite: String,
});

export const User = new mongoose.model("User", userSchema);
