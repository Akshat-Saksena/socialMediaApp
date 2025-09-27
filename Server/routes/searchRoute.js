import express from "express";
import {
  searchSuggestion,
  searchFull,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchSuggestion);
router.get("/full", searchFull);

export default router;
