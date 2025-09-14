import express from "express";
import { addComment, getCommments } from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getCommments);
router.post("/", addComment);

export default router;
