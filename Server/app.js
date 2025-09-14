import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likesRoute from "./routes/likesRoute.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import fileUpload from "./routes/fileRoute.js";
import path from "path";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likesRoute);
app.use("/api/upload", fileUpload);
app.use("/api/comments", commentRoute);

app.use("/uploads", express.static("./uploads"));

app.get("/api/check", (req, res) => {
  res.json({ message: "Server working" });
  console.log("server working");
});

export default app;
