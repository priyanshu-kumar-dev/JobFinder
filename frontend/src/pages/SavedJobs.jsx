
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  // Fetch saved jobs from MongoDB
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/jobs/saved`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch saved jobs.");
      }

      setSavedJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // Search saved jobs
  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return savedJobs.filter((job) =>
      `${job.title || ""} ${job.company || ""} ${job.location || ""}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [savedJobs, search]);

  // Remove saved job from MongoDB
  const handleRemove = async (jobId) => {
    try {
      setRemovingId(jobId);

      const response = await fetch(
        `${API_URL}/api/jobs/${jobId}/save`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove saved job.");
      }

      if (data.saved === false) {
        setSavedJobs((previousJobs) =>
          previousJobs.filter((job) => String(job._id) !== String(jobId))
        );

        window.dispatchEvent(new Event("savedJobsUpdated"));
      }
    } catch (err) {
      setError(err.message || "Unable to remove job.");
    } finally {
      setRemovingId(null);
    }
  };

  const formatSalary = (job) => {
    if (job.salary) {
      return typeof job.salary === "number"
        ? `₹${job.salary.toLocaleString("en-IN")}`
        : job.salary;
    }

    if (job.salaryMin || job.salaryMax) {
      const min = job.salaryMin
        ? `₹${Number(job.salaryMin).toLocaleString("en-IN")}`
        : "";

      const max = job.salaryMax
        ? `₹${Number(job.salaryMax).toLocaleString("en-IN")}`
        : "";

      if (min && max) return `${min} - ${max}`;
      return min || max;
    }

    return "Salary not disclosed";
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
              Your Career Collection
            </span>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Saved Jobs
            </h1>

            <p className="mt-2 text-gray-500">
              Keep track of the opportunities you don't want to miss.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8 md:flex-row">

            {/* Sidebar */}
            <div className="shrink-0 md:w-64">
              <Sidebar role="applicant" />
            </div>

            {/* Main Content */}
            <div className="min-w-0 flex-1">

              {/* Stats */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-purple-100 bg-linear-to-br from-purple-50 to-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Saved Jobs
                      </p>

                      <h3 className="mt-2 text-3xl font-extrabold text-purple-700">
                        {savedJobs.length}
                      </h3>
                    </div>

                    <span className="text-3xl">❤️</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Matching Results
                      </p>

                      <h3 className="mt-2 text-3xl font-extrabold text-blue-700">
                        {filteredJobs.length}
                      </h3>
                    </div>

                    <span className="text-3xl">🔍</span>
                  </div>
                </motion.div>

              </div>

              {/* Saved Jobs Section */}
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <SectionTitle
                    title="Your Saved Jobs"
                    subtitle={`${savedJobs.length} opportunities bookmarked by you.`}
                  />

                  <Link
                    to="/jobs"
                    className="shrink-0 rounded-xl bg-purple-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-purple-800"
                  >
                    + Find More Jobs
                  </Link>
                </div>

                {/* Search */}
                {!loading && savedJobs.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50">
                      <span className="text-lg text-gray-400">⌕</span>

                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search saved jobs or companies..."
                        className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none"
                      />

                      {search && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          className="text-xs font-semibold text-purple-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">{error}</p>

                    <button
                      type="button"
                      onClick={fetchSavedJobs}
                      className="mt-2 text-sm font-bold text-red-700 underline"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Loading */}
                {loading ? (
                  <div className="space-y-4 py-6">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-32 animate-pulse rounded-2xl bg-gray-100"
                      />
                    ))}
                  </div>
                ) : savedJobs.length > 0 ? (
                  filteredJobs.length > 0 ? (
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {filteredJobs.map((job) => {
                          const jobId = job._id;

                          return (
                            <motion.article
                              key={jobId}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: 30, scale: 0.95 }}
                              whileHover={{ y: -3 }}
                              transition={{ duration: 0.25 }}
                              className="group rounded-2xl border border-gray-200 p-5 transition-all hover:border-purple-300 hover:shadow-lg hover:shadow-purple-50"
                            >
                              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                {/* Job Information */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700">
                                      {job.company?.charAt(0) || "J"}
                                    </div>

                                    <div className="min-w-0">
                                      <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-purple-700">
                                        {job.title}
                                      </h3>

                                      <p className="mt-1 text-sm font-medium text-gray-500">
                                        {job.company}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                                      📍 {job.location || "Location not specified"}
                                    </span>

                                    <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                      💰 {formatSalary(job)}
                                    </span>

                                    <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                                      💼 {job.jobType || job.type || "Not specified"}
                                    </span>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 items-center gap-3">
                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => handleRemove(jobId)}
                                    disabled={removingId === jobId}
                                    title="Remove saved job"
                                    aria-label={`Remove ${job.title} from saved jobs`}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-xl text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {removingId === jobId ? "…" : "♥"}
                                  </motion.button>

                                  <Link
                                    to={`/jobs/${jobId}`}
                                    className="flex-1 whitespace-nowrap rounded-xl bg-purple-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-purple-800 sm:flex-none"
                                  >
                                    View Details →
                                  </Link>
                                </div>

                              </div>
                            </motion.article>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="text-4xl">🔍</div>

                      <h3 className="mt-3 font-bold text-gray-900">
                        No matching jobs
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Try searching with another keyword.
                      </p>
                    </div>
                  )
                ) : (
                  <EmptyState
                    title="No Saved Jobs"
                    message="You haven't saved any jobs yet. Explore available jobs and save the ones you like."
                    buttonText="Explore Jobs"
                    buttonLink="/jobs"
                  />
                )}

              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SavedJobs;
