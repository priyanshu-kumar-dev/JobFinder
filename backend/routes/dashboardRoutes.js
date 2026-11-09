import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { candidateDashboard, recruiterDashboard } from "../controllers/dashboardController.js";

const router = express.Router();
router.get("/candidate", protect, authorize("candidate"), candidateDashboard);
router.get("/recruiter", protect, authorize("recruiter"), recruiterDashboard);
export default router;