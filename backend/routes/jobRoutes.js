
import express from "express";
import {
  protect,
  authorize,
  optionalAuth,
} from "../middleware/auth.js";

import {
  getJobs,
  getJob,
  getSimilarJobs,
  getMyJobs,
  getSavedJobs,
  createJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Recruiter-only middleware
const recruiterOnly = [protect, authorize("recruiter")];

// 1. Public routes
router.get("/", optionalAuth, getJobs);

// 2. Saved jobs (must be before /:id)
router.get("/saved", protect, authorize("candidate"), getSavedJobs);

// 3. Recruiter routes
router.get("/mine", ...recruiterOnly, getMyJobs);

// 4. Similar jobs
router.get("/:id/similar", optionalAuth, getSimilarJobs);

// 5. Single job
router.get("/:id", optionalAuth, getJob);

// 6. Create, update and delete jobs
router.post("/", ...recruiterOnly, createJob);
router.put("/:id", ...recruiterOnly, updateJob);
router.delete("/:id", ...recruiterOnly, deleteJob);

// 7. Save / unsave job
router.post("/:id/save", protect, authorize("candidate"), toggleSaveJob);

export default router;
