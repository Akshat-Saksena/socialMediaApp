import express from "express";
import mongoose from "mongoose";

const app = express();

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/socialMedia");
  console.log("mongoDb connected");
} catch (err) {
  console.log("mongoDb connection failed --- " + err);
}

app.listen(8800, () => {
  console.log("Server Started");
});
