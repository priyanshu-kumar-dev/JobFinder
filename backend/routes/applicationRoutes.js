import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";
import {
  applyToJob, getMyApplications, getJobApplicants, updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

// Order matter karta hai: pehle login + role check, phir file upload.
// Warna unauthorized user bhi Cloudinary par file upload kar sakta.
router.post("/:jobId", protect, authorize("candidate"), upload.single("resume"), applyToJob);
router.get("/me", protect, authorize("candidate"), getMyApplications);
router.get("/job/:jobId", protect, authorize("recruiter"), getJobApplicants);
router.patch("/:id/status", protect, authorize("recruiter"), updateApplicationStatus);

export default router;