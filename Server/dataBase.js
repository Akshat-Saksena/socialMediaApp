import mongoose from "mongoose";

export const dataBase = async () => {
  try {
    console.log("Connecting to MongoDb server...");
    await mongoose.connect("mongodb://127.0.0.1:27017/socialMedia");
    console.log("mongoDb connected");
  } catch (err) {
    console.log("mongoDb connection failed --- " + err);
  }
};
