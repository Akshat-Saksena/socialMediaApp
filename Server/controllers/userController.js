import { User } from "../models/userModel.js";

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
