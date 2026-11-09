import mongoose from "mongoose";

export const APPLICATION_STATUSES = ["Applied", "In Progress", "Shortlisted", "Interview", "Rejected", "Hired"];

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { url: { type: String, required: true }, publicId: String },
    coverLetter: { type: String, maxlength: 2000, default: "" },
    status: { type: String, enum: APPLICATION_STATUSES, default: "Applied" },
  },
  { timestamps: true }
);

// Ek user ek job par sirf ek baar apply kare (DB level guarantee)
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);