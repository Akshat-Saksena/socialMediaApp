import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  img: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const Story = new mongoose.model("Story", storySchema);
