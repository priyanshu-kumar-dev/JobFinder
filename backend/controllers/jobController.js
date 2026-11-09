
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

const str = (v) => (typeof v === "string" ? v.trim() : "");

const toArray = (v) =>
  [].concat(v ?? []).filter((x) => typeof x === "string");

const escapeRegex = (s) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const JOB_FIELDS = [
  "title",
  "company",
  "description",
  "requirements",
  "skills",
  "location",
  "workMode",
  "jobType",
  "experienceMin",
  "experienceMax",
  "salaryMin",
  "salaryMax",
];

const pickJobFields = (body) =>
  Object.fromEntries(
    Object.entries(body).filter(([key]) => JOB_FIELDS.includes(key))
  );

const markSaved = (jobs, user) => {
  const saved = new Set((user?.savedJobs || []).map(String));

  return jobs.map((job) => ({
    ...job,
    isSaved: saved.has(String(job._id)),
  }));
};

// GET /api/jobs
export const getJobs = async (req, res, next) => {
  try {
    const search = str(req.query.search);
    const location = str(req.query.location);
    const sort = str(req.query.sort) || "newest";

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

    const conditions = [{ isActive: true }];

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");

      conditions.push({
        $or: [
          { title: regex },
          { company: regex },
          { skills: regex },
        ],
      });
    }

    if (location) {
      conditions.push({
        location: new RegExp(escapeRegex(location), "i"),
      });
    }

    const jobTypes = toArray(req.query.jobType);
    const workModes = toArray(req.query.workMode);

    if (jobTypes.length) {
      conditions.push({ jobType: { $in: jobTypes } });
    }

    if (workModes.length) {
      conditions.push({ workMode: { $in: workModes } });
    }

    const experience = toArray(req.query.experience).filter((range) =>
      /^\d+-\d+$/.test(range)
    );

    if (experience.length) {
      conditions.push({
        $or: experience.map((range) => {
          const [min, max] = range.split("-").map(Number);

          return {
            experienceMin: { $lte: max },
            experienceMax: { $gte: min },
          };
        }),
      });
    }

    const salaryMin = Number(req.query.salaryMin);
    const salaryMax = Number(req.query.salaryMax);

    if (salaryMin > 0) {
      conditions.push({ salaryMax: { $gte: salaryMin } });
    }

    if (salaryMax > 0) {
      conditions.push({ salaryMin: { $lte: salaryMax } });
    }

    const sortMap = {
      newest: { createdAt: -1 },
      salary_high: { salaryMax: -1 },
      salary_low: { salaryMin: 1 },
      popular: { views: -1 },
    };

    const sortOption = Object.hasOwn(sortMap, sort)
      ? sortMap[sort]
      : sortMap.newest;

    const filter = { $and: conditions };

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Job.countDocuments(filter),
    ]);

    res.json({
      jobs: markSaved(jobs, req.user),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/saved
export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "savedJobs",
        match: { isActive: true },
      })
      .lean();

    res.json({
      jobs: markSaved(user?.savedJobs || [], req.user),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id
export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!job) {
      return res.status(404).json({ message: "Job nahi mili" });
    }

    res.json({
      job: markSaved([job], req.user)[0],
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id/similar
export const getSimilarJobs = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).lean();

    if (!job) {
      return res.status(404).json({ message: "Job nahi mili" });
    }

    const similar = await Job.find({
      _id: { $ne: job._id },
      isActive: true,
      $or: [
        { skills: { $in: job.skills || [] } },
        { jobType: job.jobType },
        { location: job.location },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    res.json({
      jobs: markSaved(similar, req.user),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/mine
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.aggregate([
      { $match: { postedBy: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job",
          as: "apps",
        },
      },
      {
        $addFields: {
          applicantsCount: { $size: "$apps" },
        },
      },
      { $project: { apps: 0 } },
    ]);

    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...pickJobFields(req.body),
      postedBy: req.user._id,
    });

    res.status(201).json({ job });
  } catch (err) {
    next(err);
  }
};

// PUT /api/jobs/:id
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job nahi mili" });
    }

    if (!job.postedBy.equals(req.user._id)) {
      return res.status(403).json({
        message: "Ye job aapki nahi hai",
      });
    }

    Object.assign(job, pickJobFields(req.body));

    await job.save();

    res.json({ job });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job nahi mili" });
    }

    if (!job.postedBy.equals(req.user._id)) {
      return res.status(403).json({
        message: "Ye job aapki nahi hai",
      });
    }

    await Promise.all([
      job.deleteOne(),
      Application.deleteMany({ job: job._id }),
      User.updateMany(
        { savedJobs: job._id },
        { $pull: { savedJobs: job._id } }
      ),
    ]);

    res.json({ message: "Job delete ho gayi" });
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs/:id/save
export const toggleSaveJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
      _id: id,
      isActive: true,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job nahi mili",
      });
    }

    const alreadySaved = (req.user.savedJobs || []).some(
      (savedId) => savedId.toString() === id
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      alreadySaved
        ? { $pull: { savedJobs: id } }
        : { $addToSet: { savedJobs: id } },
      { new: true }
    );

    res.json({
      saved: updatedUser.savedJobs.some(
        (savedId) => savedId.toString() === id
      ),
      message: alreadySaved
        ? "Job removed from saved jobs"
        : "Job saved successfully",
    });
  } catch (err) {
    next(err);
  }
};
