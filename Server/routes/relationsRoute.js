import express from "express";
import {
  follow,
  getStatus,
  unFollow,
} from "../controllers/relationController.js";

const router = express.Router();

router.post("/follow", follow);
router.post("/unFollow", unFollow);
router.get("/status", getStatus);

export default router;
