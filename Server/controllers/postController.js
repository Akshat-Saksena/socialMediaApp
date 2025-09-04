import { Post } from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          img: 1,
          createdAt: 1,
          "user._id": 1,
          "user.profilePic": 1,
          "user.name": 1,
        },
      },
    ]);
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
    console.log(err);
  }
};
