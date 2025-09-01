import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  createdAt: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export const Comment = new mongoose.model("Comment", commentSchema);
