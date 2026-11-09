import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import jobs from "../data/jobs";
import savedJobs from "../data/savedJobs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Backend application status categories
const pendingStatuses = ["Applied", "In Progress"];
const acceptedStatuses = ["Shortlisted", "Interview", "Hired"];

const getCategory = (status = "") => {
  if (pendingStatuses.includes(status)) return "pending";
  if (acceptedStatuses.includes(status)) return "accepted";
  if (status === "Rejected") return "rejected";
  return "pending";
};

const ApplicantDashboard = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Fetch applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/applications/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load applications.");
        }

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [retry]);

  // Dynamic statistics
  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (item) => getCategory(item.status) === "pending",
  ).length;

  const acceptedApplications = applications.filter(
    (item) => getCategory(item.status) === "accepted",
  ).length;

  const rejectedApplications = applications.filter(
    (item) => getCategory(item.status) === "rejected",
  ).length;

  // Search and filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const title = application.job?.title || "";
      const company = application.job?.company || "";

      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        title.toLowerCase().includes(searchValue) ||
        company.toLowerCase().includes(searchValue);

      const matchesStatus =
        activeFilter === "all" ||
        getCategory(application.status) === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, activeFilter]);

  // Status styles
  const getStatusStyle = (status) => {
    if (acceptedStatuses.includes(status)) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  // Recommended jobs (existing local data)
  const recommendedJobs = jobs.slice(0, 3);

  // Dashboard statistics cards
  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: "📄",
      filter: "all",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      activeBorder: "border-purple-500",
    },
    {
      title: "Pending",
      value: pendingApplications,
      icon: "⏳",
      filter: "pending",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      activeBorder: "border-amber-500",
    },
    {
      title: "Accepted",
      value: acceptedApplications,
      icon: "✓",
      filter: "accepted",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      activeBorder: "border-emerald-500",
    },
    {
      title: "Saved Jobs",
      value: savedJobs.length,
      icon: "♡",
      filter: "saved",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-700",
      activeBorder: "border-pink-500",
    },
  ];

  const filterTabs = [
    { label: "All Applications", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
  ];

  // Accepted applications percentage
  const progress = totalApplications
    ? Math.round((acceptedApplications / totalApplications) * 100)
    : 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F7FC]">
        {/* Hero Header */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#190D35] via-purple-900 to-purple-600 px-5 py-12 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-purple-100">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                APPLICANT WORKSPACE
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Your Career,
                <span className="block text-purple-200">
                  Your Next Chapter.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-purple-100 sm:text-base">
                Track applications, explore opportunities and stay one step
                closer to your dream career.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/jobs"
                className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-purple-800 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-purple-50"
              >
                + Explore Jobs
              </Link>

              <Link
                to="/profile"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                My Profile →
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Layout */}
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8">
          <div className="flex flex-col gap-7 lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <Sidebar role="applicant" />
              </div>
            </aside>

            {/* Main Dashboard */}
            <div className="min-w-0 flex-1">
              {/* Overview */}
              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                    Overview
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
                    Dashboard Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Here's your job search activity at a glance.
                  </p>
                </div>

                <Link
                  to="/applications"
                  className="text-sm font-bold text-purple-700 hover:text-purple-900"
                >
                  Manage Applications →
                </Link>
              </div>

              {/* Statistics Cards */}
              <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <button
                    key={stat.title}
                    type="button"
                    onClick={() => {
                      if (stat.filter === "saved") {
                        navigate("/saved-jobs");
                      } else {
                        setActiveFilter(stat.filter);
                      }
                    }}
                    className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      activeFilter === stat.filter
                        ? `${stat.activeBorder} shadow-md`
                        : "border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.iconBg} ${stat.iconColor}`}
                      >
                        {stat.icon}
                      </div>

                      <span className="text-xs font-semibold text-gray-400 transition group-hover:text-purple-600">
                        View →
                      </span>
                    </div>

                    <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900">
                      {loading ? "—" : stat.value}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                  </button>
                ))}
              </div>

              {/* Progress Card */}
              <section className="mb-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
                      Career Progress
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold text-gray-900">
                      Your Application Progress
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Percentage of applications marked as accepted.
                    </p>
                  </div>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-purple-100 bg-purple-50">
                    <span className="text-xl font-extrabold text-purple-700">
                      {loading ? "—" : `${progress}%`}
                    </span>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-purple-600 to-indigo-500 transition-all duration-700"
                    style={{
                      width: `${loading ? 0 : progress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-xs font-medium text-gray-400">
                  <span>{loading ? "—" : acceptedApplications} Accepted</span>

                  <span>
                    {loading ? "—" : totalApplications} Total Applications
                  </span>
                </div>
              </section>

              {/* Applications Section */}
              <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900">
                      My Applications
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Track and manage your job applications.
                    </p>
                  </div>

                  <Link
                    to="/applications"
                    className="text-sm font-bold text-purple-700 transition hover:text-purple-900"
                  >
                    View All →
                  </Link>
                </div>

                {/* Search */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-purple-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-50">
                    <span className="text-lg text-gray-400">⌕</span>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by job title or company..."
                      className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="text-sm font-bold text-gray-400 hover:text-purple-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveFilter(tab.value)}
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                        activeFilter === tab.value
                          ? "bg-purple-700 text-white shadow-lg shadow-purple-200"
                          : "bg-gray-100 text-gray-500 hover:bg-purple-50 hover:text-purple-700"
                      }`}
                    >
                      {tab.label}
                      {tab.value === "all" && !loading
                        ? ` (${totalApplications})`
                        : ""}
                    </button>
                  ))}
                </div>

                {/* Application List */}
                {loading ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-purple-100 border-t-purple-700" />

                    <p className="mt-4 text-sm text-gray-500">
                      Loading your applications...
                    </p>
                  </div>
                ) : error ? (
                  <div className="rounded-xl bg-red-50 px-5 py-8 text-center">
                    <p className="font-semibold text-red-700">{error}</p>

                    <button
                      type="button"
                      onClick={() => setRetry((prev) => prev + 1)}
                      className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredApplications.length > 0 ? (
                  <div className="space-y-3">
                    {filteredApplications.map((application) => {
                      const job = application.job;

                      const title = job?.title || "Job Application";
                      const company = job?.company || "Company";
                      const status = application.status || "Applied";

                      return (
                        <div
                          key={application._id}
                          className="group flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 transition-all duration-300 hover:border-purple-200 hover:bg-purple-50/30 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-lg font-extrabold text-purple-700 transition group-hover:bg-purple-100">
                              {company.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <h3 className="font-bold text-gray-900 transition group-hover:text-purple-700">
                                {title}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                {company}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                Applied on{" "}
                                {application.createdAt
                                  ? new Date(
                                      application.createdAt,
                                    ).toLocaleDateString("en-IN")
                                  : "Date unavailable"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <span
                              className={`rounded-full border px-3 py-2 text-xs font-bold ${getStatusStyle(status)}`}
                            >
                              {status}
                            </span>

                            {job?._id && (
                              <Link
                                to={`/jobs/${job._id}`}
                                className="text-sm font-bold text-purple-700 transition hover:underline"
                              >
                                Details →
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl bg-gray-50 py-10 text-center">
                    <div className="text-4xl">🔍</div>

                    <h3 className="mt-4 font-bold text-gray-800">
                      No Applications Found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {applications.length === 0
                        ? "You haven't applied for any jobs yet. Explore jobs and submit your first application."
                        : "Try another search or change the selected filter."}
                    </p>

                    {applications.length === 0 ? (
                      <Link
                        to="/jobs"
                        className="mt-5 inline-block rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-800"
                      >
                        Explore Jobs
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setActiveFilter("all");
                        }}
                        className="mt-5 rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-800"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </section>

              {/* Recommended Jobs */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
                      Discover
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold text-gray-900">
                      Recommended Jobs
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Explore opportunities for your next career move.
                    </p>
                  </div>

                  <Link
                    to="/jobs"
                    className="text-sm font-bold text-purple-700 transition hover:text-purple-900"
                  >
                    Browse All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id || job._id}
                      className="group rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                          style={{
                            backgroundColor: `${job.logoColor || "#7C3AED"}15`,
                            color: job.logoColor || "#7C3AED",
                          }}
                        >
                          {job.logo || job.company?.charAt(0) || "J"}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-gray-900 transition group-hover:text-purple-700">
                            {job.title}
                          </h3>

                          <p className="mt-1 truncate text-sm text-gray-500">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                          📍 {job.location}
                        </span>

                        <span className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700">
                          {job.type}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <p className="text-sm font-extrabold text-purple-700">
                          {typeof job.salary === "number"
                            ? `₹${job.salary.toLocaleString("en-IN")}/month`
                            : job.salary || "Salary not disclosed"}
                        </p>

                        <Link
                          to={`/jobs/${job.id || job._id}`}
                          className="rounded-lg bg-purple-50 px-4 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-700 hover:text-white"
                        >
                          View Job →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ApplicantDashboard;
