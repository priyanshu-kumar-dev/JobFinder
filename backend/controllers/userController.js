import User from "../models/User.js";

export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs").lean();
    res.json({ jobs: user.savedJobs.map((j) => ({ ...j, isSaved: true })) });
  } catch (err) {
    next(err);
  }
};