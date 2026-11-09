import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Registration backend functionality will be added soon.");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-purple-100/40 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-purple-800 via-purple-700 to-indigo-900 p-10 text-white lg:flex"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-purple-700">
                  J
                </div>
                <span className="text-xl font-extrabold">JobFinder</span>
              </div>

              <div className="mt-24">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider">
                  YOUR CAREER STARTS HERE
                </span>

                <h1 className="mt-7 text-4xl font-extrabold leading-tight">
                  Find the job
                  <br />
                  that fits your
                  <span className="text-purple-200"> future.</span>
                </h1>

                <p className="mt-5 max-w-sm leading-7 text-purple-100">
                  Create your free account and connect with opportunities that
                  help you grow professionally.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-16 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-2xl font-extrabold">500+</h3>
                <p className="mt-1 text-sm text-purple-100">Companies</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-2xl font-extrabold">1K+</h3>
                <p className="mt-1 text-sm text-purple-100">
                  Job Opportunities
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-10 lg:p-12"
          >
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
                Get Started
              </span>

              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Join JobFinder and discover new opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-gray-400">
                  Minimum 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Account Role */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  I want to register as
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role: "applicant" }))
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      formData.role === "applicant"
                        ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <span className="text-2xl">👨‍💻</span>
                    <p className="mt-2 text-sm font-bold text-gray-900">
                      Job Seeker
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Find opportunities
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role: "recruiter" }))
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      formData.role === "recruiter"
                        ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <span className="text-2xl">🏢</span>
                    <p className="mt-2 text-sm font-bold text-gray-900">
                      Recruiter
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Hire talented people
                    </p>
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-xl bg-purple-700 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800"
              >
                Create Account →
              </motion.button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-purple-600 hover:text-purple-800"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;
