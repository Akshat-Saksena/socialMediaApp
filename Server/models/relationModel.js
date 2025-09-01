import mongoose from "mongoose";

const relationSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  followedId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

export const Relation = new mongoose.model("Relation", relationSchema);
