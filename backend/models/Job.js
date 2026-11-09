import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Job title zaroori hai"], trim: true, maxlength: 120 },
    company: { type: String, required: true, trim: true },
    description: { type: String, required: true, maxlength: 5000 },
    requirements: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true, lowercase: true }],
    location: { type: String, required: true, trim: true },
    workMode: { type: String, enum: ["Onsite", "Hybrid", "Remote"], default: "Onsite" },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time" },
    experienceMin: { type: Number, default: 0, min: 0 },   // years
    experienceMax: { type: Number, default: 1, min: 0 },
    salaryMin: { type: Number, required: true, min: 0 },   // monthly INR
    salaryMax: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

// Salary max, min se kam na ho
jobSchema.pre("validate", function () {
  if (this.salaryMax < this.salaryMin) {
    this.invalidate("salaryMax", "Max salary min salary se kam nahi ho sakti");
  }
});

jobSchema.index({ createdAt: -1 });
jobSchema.index({ location: 1, jobType: 1, workMode: 1 });

export default mongoose.model("Job", jobSchema);