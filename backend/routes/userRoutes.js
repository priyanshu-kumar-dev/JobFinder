import express from "express";
import { protect } from "../middleware/auth.js";
import { getSavedJobs } from "../controllers/userController.js";

const router = express.Router();
router.get("/me/saved-jobs", protect, getSavedJobs);
export default router;