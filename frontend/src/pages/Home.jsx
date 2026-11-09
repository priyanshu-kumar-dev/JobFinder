
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import SectionTitle from "../components/SectionTitle";
import jobs from "../data/jobs";
import categories from "../data/categories";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const featuredJobs = jobs.slice(0, 3);

  const popularSearches = [
    "React Developer",
    "MERN Developer",
    "Java Developer",
    "UI/UX Designer",
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    navigate(
      query ? `/jobs?search=${encodeURIComponent(query)}` : "/jobs"
    );
  };

  const handlePopularSearch = (item) => {
    navigate(`/jobs?search=${encodeURIComponent(item)}`);
  };

  const stats = [
    { value: "500+", label: "Active Jobs", icon: "💼" },
    { value: "100+", label: "Companies", icon: "🏢" },
    { value: "1K+", label: "Job Seekers", icon: "👥" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-purple-600 text-white">

          {/* Background Decorations */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-300 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-pink-400 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mx-auto max-w-4xl text-center"
            >

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-green-400"
                />
                Your next career opportunity starts here
              </motion.span>

              {/* Heading */}
              <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Find Your
                <span className="text-purple-300"> Dream Job</span>
                <br />
                Build Your Future
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-purple-100 md:text-lg"
              >
                Discover exciting opportunities from top companies. Find the
                right role, showcase your skills and take the next step in your
                career.
              </motion.p>

              {/* Improved Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-purple-950/30 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center px-3">

                  {/* Search Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-purple-600"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>

                  <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Job title, company or keywords..."
                    aria-label="Search jobs by title, company or keywords"
                    className="w-full min-w-0 px-4 py-4 text-gray-800 outline-none placeholder:text-gray-400"
                  />

                  {/* Clear Search */}
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="shrink-0 rounded-full p-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 font-semibold text-white transition hover:bg-purple-700"
                >
                  Search Jobs
                  <span>→</span>
                </motion.button>
              </motion.form>

              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-3"
              >
                <span className="text-sm text-purple-200">Popular:</span>

                {popularSearches.map((item, index) => (
                  <motion.button
                    key={item}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePopularSearch(item)}
                    className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90 transition hover:bg-white hover:text-purple-800"
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Statistics */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/20 pt-8 sm:grid-cols-3">

              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className={`text-center ${
                    index === 1 ? "sm:border-x sm:border-white/20" : ""
                  }`}
                >
                  <span className="text-2xl">{stat.icon}</span>

                  <h3 className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-purple-200">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="relative overflow-hidden bg-slate-50 px-5 py-20 sm:px-6 md:py-24">

          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                  <span className="h-2 w-2 rounded-full bg-purple-600" />
                  Explore Opportunities
                </div>

                <SectionTitle
                  title="Popular Job Categories"
                  subtitle="Discover exciting career opportunities across different industries."
                />
              </div>

              <Link
                to="/jobs"
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-purple-200 bg-white px-5 py-3 font-semibold text-purple-700 shadow-sm transition duration-300 hover:border-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-200"
              >
                Explore All Jobs
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link
                    to={`/jobs?category=${encodeURIComponent(category.name)}`}
                    className="group relative flex h-full min-h-64 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-100/70"
                  >
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-purple-100/50 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                    <div className="relative flex items-center justify-between">

                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-100 bg-linear-to-br from-purple-100 to-indigo-50 text-3xl shadow-sm"
                      >
                        {category.icon}
                      </motion.div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-500 transition-all duration-300 group-hover:border-purple-600 group-hover:bg-purple-600 group-hover:text-white">
                        <span className="transition-transform duration-300 group-hover:-rotate-45">
                          →
                        </span>
                      </div>
                    </div>

                    <div className="relative mt-7">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-purple-700">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {category.description}
                      </p>
                    </div>

                    <div className="relative mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="rounded-lg bg-purple-50 px-3 py-2 text-sm font-bold text-purple-700 transition-colors group-hover:bg-purple-100">
                        {category.jobs}+ Jobs Available
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-purple-600">
                        Explore
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED JOBS SECTION */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">

            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                  Handpicked for you
                </p>

                <SectionTitle
                  title="Featured Job Opportunities"
                  subtitle="Explore the latest opportunities from leading companies."
                />
              </div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  View All Jobs →
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-800 to-purple-600 px-7 py-14 text-center md:px-16 md:py-16"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-400/30 blur-2xl"
            />

            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-pink-400/20 blur-2xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-purple-200">
                Start your journey today
              </span>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Find Your Next Opportunity?
              </h2>

              <p className="mt-5 leading-relaxed text-purple-100">
                Create your free profile, explore exciting opportunities and
                connect with companies that value your skills.
              </p>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="mt-8 inline-block"
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-purple-700 shadow-lg transition hover:bg-purple-50"
                >
                  Get Started for Free →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Home;
