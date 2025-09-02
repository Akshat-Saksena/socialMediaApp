import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likesRoute from "./routes/likesRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likesRoute);

app.get("/api/check", (req, res) => {
  res.json({ message: "Server working" });
  console.log("server working");
});

try {
  console.log("Connecting to MongoDb server...");
  await mongoose.connect("mongodb://127.0.0.1:27017/socialMedia");
  console.log("mongoDb connected");
} catch (err) {
  console.log("mongoDb connection failed --- " + err);
}

app.listen(8800, () => {
  console.log("Server Started");
});
