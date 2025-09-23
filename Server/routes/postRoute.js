import express from "express";
import {
  getPosts,
  addPost,
  getUserPosts,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/:userName", getUserPosts);
router.delete("/", deletePost);
export default router;
