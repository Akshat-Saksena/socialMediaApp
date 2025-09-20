import express from "express";
import {
  getPosts,
  addPost,
  getUserPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/:userName", getUserPosts);
export default router;
