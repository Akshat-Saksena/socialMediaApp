import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  desc: String,
  img: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: Date,
});

export const Post = new mongoose.model("Post", postSchema);
