import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import jobs from "../data/jobs";
import categories from "../data/categories";

const Jobs = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [type, setType] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      (job.title || "").toLowerCase().includes(searchText) ||
      (job.company || "").toLowerCase().includes(searchText) ||
      (job.description || "").toLowerCase().includes(searchText);

    const matchesLocation = (job.location || "")
      .toLowerCase()
      .includes(location.toLowerCase().trim());

    const jobCategory = (job.category || "").toLowerCase();
    const selectedCategory = category.toLowerCase();

    const matchesCategory =
      !category ||
      jobCategory === selectedCategory ||
      (job.title || "").toLowerCase().includes(selectedCategory) ||
      (job.description || "").toLowerCase().includes(selectedCategory);

    const matchesType =
      !type || (job.type || "").toLowerCase() === type.toLowerCase();

    return matchesSearch && matchesLocation && matchesCategory && matchesType;
  });

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setType("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-purple-600 px-6 py-16 text-white">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-purple-100">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              YOUR NEXT OPPORTUNITY STARTS HERE
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Find a Job That
              <span className="block text-purple-200">
                Matches Your Ambition.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-purple-100 sm:text-base">
              Discover exciting opportunities, explore top companies, and take
              the next step in your professional journey.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="mt-9 grid max-w-3xl grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-2xl shadow-purple-950/20 sm:grid-cols-[1fr_1fr_auto]"
            >
              <div className="flex items-center gap-3 px-3">
                <span className="text-xl text-purple-600">⌕</span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title or company"
                  className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-3 border-t border-gray-100 px-3 sm:border-l sm:border-t-0">
                <span className="text-lg text-purple-600">📍</span>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or location"
                  className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-purple-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-800"
              >
                Search Jobs
              </button>
            </form>

            <p className="mt-5 text-xs text-purple-200">
              Popular searches: React Developer · Frontend · MERN Stack ·
              Internship
            </p>
          </div>
        </section>

        {/* Main Jobs Section */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
          {/* Heading */}
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
                Explore Opportunities
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                Find Your Perfect Job
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Discover jobs that match your skills and career goals.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3">
              <span className="text-lg font-extrabold text-purple-700">
                {filteredJobs.length}
              </span>

              <span className="text-sm font-medium text-gray-600">
                Jobs Found
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-4">
            {/* Filter Sidebar */}
            <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Refine your job search
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                >
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Search Keywords
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. React Developer"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or location"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Job Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                >
                  <option value="">All Categories</option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Employment Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="mt-7 rounded-xl bg-purple-50 p-4">
                <p className="text-sm font-bold text-purple-800">
                  Looking for a job?
                </p>

                <p className="mt-1 text-xs leading-5 text-purple-600">
                  Create your profile and explore opportunities.
                </p>

                <Link
                  to="/signup"
                  className="mt-3 inline-block text-sm font-bold text-purple-700 hover:underline"
                >
                  Get Started →
                </Link>
              </div>
            </aside>

            {/* Job Results */}
            <div className="lg:col-span-3">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-gray-900">
                    {filteredJobs.length}
                  </span>{" "}
                  opportunities
                </p>

                <span className="text-xs font-medium text-gray-400">
                  Latest opportunities
                </span>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {filteredJobs.map((job, index) => (
                    <JobCard key={job.id || job._id || index} job={job} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm">
                  <EmptyState
                    title="No Jobs Found"
                    message="Try changing your search keywords or filters to discover more opportunities."
                    buttonText="Reset Filters"
                    buttonLink="/jobs"
                  />

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-3 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Jobs;
