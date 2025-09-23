import mongoose from "mongoose";
import { Comment } from "./commentModel.js";

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

postSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      const filter = this.getFilter();
      const postId = filter._id;

      if (postId) {
        await Comment.deleteMany({ postId: postId });
      }
      next();
    } catch (err) {
      next(err);
    }
  }
);

export const Post = new mongoose.model("Post", postSchema);
