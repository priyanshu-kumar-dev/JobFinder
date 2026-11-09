
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const JobCard = ({ job }) => {
  const {
    id,
    _id,
    title,
    company,
    location,
    salary,
    salaryMin,
    salaryMax,
    type = "Full-time",
    jobType,
    workMode = "Remote",
    experience = "0-1 years",
    experienceMin,
    experienceMax,
    postedAt = "Recently posted",
    applicants = 0,
    logo,
    logoColor = "#7C3AED",
    description,
    isSaved = false,
  } = job || {};

  const jobId = _id || id;

  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Sync saved state when job data changes
  useEffect(() => {
    setSaved(Boolean(isSaved));
  }, [isSaved, jobId]);

  // Sync saved state when another component updates it
  useEffect(() => {
    const syncSavedJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/jobs/saved`, {
          credentials: "include",
        });

        if (!response.ok) return;

        const data = await response.json();

        setSaved(
          (data.jobs || []).some(
            (item) => String(item._id) === String(jobId)
          )
        );
      } catch (error) {
        console.error("Unable to sync saved jobs:", error);
      }
    };

    window.addEventListener("savedJobsUpdated", syncSavedJobs);

    return () => {
      window.removeEventListener("savedJobsUpdated", syncSavedJobs);
    };
  }, [jobId]);

  // Save / Unsave through backend
  const handleSave = async () => {
    if (!jobId || saving) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/jobs/${jobId}/save`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save job.");
      }

      setSaved(Boolean(data.saved));

      window.dispatchEvent(new Event("savedJobsUpdated"));
    } catch (error) {
      console.error("Save job error:", error);
      alert(error.message || "Please login to save jobs.");
    } finally {
      setSaving(false);
    }
  };

  const formattedSalary = (() => {
    if (salary) {
      return typeof salary === "number"
        ? `₹${salary.toLocaleString("en-IN")}`
        : salary;
    }

    if (salaryMin || salaryMax) {
      const min = salaryMin
        ? `₹${Number(salaryMin).toLocaleString("en-IN")}`
        : "";

      const max = salaryMax
        ? `₹${Number(salaryMax).toLocaleString("en-IN")}`
        : "";

      if (min && max) return `${min} - ${max}`;
      return min || max;
    }

    return "Not disclosed";
  })();

  const formattedExperience =
    experienceMin !== undefined || experienceMax !== undefined
      ? `${experienceMin ?? 0}-${experienceMax ?? "Any"} years`
      : experience;

  const isLogoUrl =
    typeof logo === "string" &&
    (logo.startsWith("http") || logo.startsWith("/"));

  const companyInitial = company?.charAt(0)?.toUpperCase() || "J";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/60 sm:p-6"
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-linear-to-r from-purple-600 to-violet-400 transition-all duration-500 group-hover:w-full" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-xl font-bold shadow-sm"
            style={{
              backgroundColor: `${logoColor}15`,
              color: logoColor,
            }}
          >
            {isLogoUrl && !logoError ? (
              <img
                src={logo}
                alt={`${company || "Company"} logo`}
                className="h-full w-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : logo && !isLogoUrl ? (
              logo
            ) : (
              companyInitial
            )}
          </motion.div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-purple-700 sm:text-lg">
              {title || "Job Title"}
            </h2>

            <p className="mt-1 truncate text-sm font-medium text-gray-500">
              {company || "Company Name"}
            </p>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          disabled={!jobId || saving}
          aria-label={saved ? "Unsave job" : "Save job"}
          aria-pressed={saved}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xl transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
            saved
              ? "border-purple-200 bg-purple-50 text-purple-700"
              : "border-gray-200 bg-white text-gray-400 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={saved ? "saved" : "unsaved"}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {saving ? "…" : saved ? "♥" : "♡"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Salary */}
      <div className="mt-6 rounded-xl border border-purple-100 bg-linear-to-br from-purple-50 via-white to-violet-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Monthly Salary
          </p>

          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-purple-600 shadow-sm">
            Salary
          </span>
        </div>

        <p className="mt-2 text-2xl font-extrabold tracking-tight text-purple-700">
          {formattedSalary}

          {typeof salary === "number" && (
            <span className="ml-1 text-xs font-medium text-gray-500">
              /month
            </span>
          )}
        </p>
      </div>

      {/* Job Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
          📍 {location || "Location not specified"}
        </span>

        <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
          💼 {jobType || type}
        </span>

        <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          🌐 {workMode}
        </span>
      </div>

      {/* Experience and Posted Date */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
          {formattedExperience}
        </span>

        <span className="text-xs text-gray-400">{postedAt}</span>
      </div>

      {/* Description */}
      <div className="mt-5 flex-1">
        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {description ||
            "Explore this opportunity and discover more about the role."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800">
            {applicants > 0 ? `${applicants}+` : "Be the first"}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            {applicants > 0 ? "Applicants" : "to apply"}
          </p>
        </div>

        {jobId ? (
          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all duration-200 hover:bg-purple-800 hover:shadow-lg active:scale-95 sm:px-5"
          >
            View Details

            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              →
            </motion.span>
          </Link>
        ) : (
          <span className="text-xs text-gray-400">
            Job unavailable
          </span>
        )}
      </div>
    </motion.article>
  );
};

export default JobCard;
