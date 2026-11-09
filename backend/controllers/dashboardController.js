import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const candidateDashboard = async (req, res, next) => {
  try {
    const stats = await Application.aggregate([
      { $match: { applicant: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const byStatus = Object.fromEntries(stats.map((s) => [s._id, s.count]));
    const total = stats.reduce((sum, s) => sum + s.count, 0);

    res.json({
      total,
      byStatus,
      saved: req.user.savedJobs.length,
      interviews: byStatus.Interview || 0,
    });
  } catch (err) {
    next(err);
  }
};

export const recruiterDashboard = async (req, res, next) => {
  try {
    const jobIds = (await Job.find({ postedBy: req.user._id }).select("_id").lean()).map((j) => j._id);
    const match = { job: { $in: jobIds } };

    const [statusStats, perJob, recent] = await Promise.all([
      Application.aggregate([
        { $match: match },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      // Chart ke liye: har job ke applicants count
      Application.aggregate([
        { $match: match },
        { $group: { _id: "$job", applicants: { $sum: 1 } } },
        { $lookup: { from: "jobs", localField: "_id", foreignField: "_id", as: "job" } },
        { $unwind: "$job" },
        { $project: { _id: 0, title: "$job.title", applicants: 1 } },
        { $sort: { applicants: -1 } },
        { $limit: 6 },
      ]),
      Application.find(match)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("applicant", "name")
        .populate("job", "title")
        .lean(),
    ]);

    const byStatus = Object.fromEntries(statusStats.map((s) => [s._id, s.count]));
    const applicants = statusStats.reduce((sum, s) => sum + s.count, 0);

    res.json({
      totals: {
        jobs: jobIds.length,
        applicants,
        shortlisted: byStatus.Shortlisted || 0,
        interviews: byStatus.Interview || 0,
      },
      chartData: perJob,
      recent,
    });
  } catch (err) {
    next(err);
  }
};