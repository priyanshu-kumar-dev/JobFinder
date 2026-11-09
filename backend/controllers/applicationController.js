import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { sendEmail } from "../utils/sendEmail.js";

// Candidate: job par apply (naya resume upload ya profile ka saved resume)
export const applyToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || !job.isActive) return res.status(404).json({ message: "Job available nahi hai" });

    const resume = req.file
      ? { url: req.file.path, publicId: req.file.filename }
      : req.user.resume;
    if (!resume?.url) return res.status(400).json({ message: "Resume upload karein" });

    const application = await Application.create({
      job: job._id,
      applicant: req.user._id,
      resume,
      coverLetter: req.body.coverLetter || "",
    });
    res.status(201).json({ application });
  } catch (err) {
    // Unique index ki wajah se duplicate apply yahin pakda jaata hai
    if (err.code === 11000) {
      return res.status(400).json({ message: "Aap is job par already apply kar chuke hain" });
    }
    next(err);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ applications });
  } catch (err) {
    next(err);
  }
};

// Recruiter: apni job ke applicants (optional ?status= filter)
export const getJobApplicants = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId).lean();
    if (!job) return res.status(404).json({ message: "Job nahi mili" });
    if (String(job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "Ye job aapki nahi hai" });
    }

    const filter = { job: job._id };
    if (typeof req.query.status === "string") filter.status = req.query.status;

    const applications = await Application.find(filter)
      .populate("applicant", "name email")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ applications });
  } catch (err) {
    next(err);
  }
};

// Recruiter: status badlo + candidate ko email
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job", "title postedBy")
      .populate("applicant", "name email");
    if (!application) return res.status(404).json({ message: "Application nahi mili" });
    if (!application.job.postedBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Permission nahi hai" });
    }

    application.status = req.body.status; // Mongoose enum validation yahin hoti hai
    await application.save();

    // Email background mein: fail ho to bhi API response nahi rukta
    sendEmail({
      to: application.applicant.email,
      subject: `Application update: ${application.job.title}`,
      html: `<p>Hi ${application.applicant.name},</p>
             <p>Aapki application <b>${application.job.title}</b> ka status ab <b>${application.status}</b> hai.</p>`,
    }).catch((err) => console.error("Email failed:", err.message));

    res.json({ application });
  } catch (err) {
    next(err);
  }
};