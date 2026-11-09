
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, role } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!["applicant", "recruiter"].includes(role)) {
      setError("Please select a valid account type.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Registration failed. Please try again."
        );
      }

      // Navigate only after successful backend registration
      navigate(
        role === "recruiter"
          ? "/recruiter-dashboard"
          : "/applicant-dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to server. Please check your backend."
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-5 py-14">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-purple-100/60 md:grid-cols-2"
        >
          {/* Left Information Panel */}
          <div className="relative hidden overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-violet-600 p-10 text-white md:flex md:flex-col md:justify-between">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-300/20 blur-2xl" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-extrabold text-purple-700">
                  J
                </span>
                <span className="text-xl font-bold">JobFinder</span>
              </Link>

              <h2 className="mt-16 text-4xl font-extrabold leading-tight">
                Create your
                <span className="block text-purple-200">success story.</span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-purple-100">
                Join JobFinder and discover exciting career opportunities.
                Connect with companies and take your professional journey to
                the next level.
              </p>
            </div>

            <div className="relative space-y-5">
              {[
                "Discover opportunities that match your skills",
                "Connect with top companies",
                "Manage your career in one place",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="flex items-center gap-3 text-sm text-purple-100"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-green-300">
                    ✓
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signup Form */}
          <div className="p-7 sm:p-10">
            <Link
              to="/"
              className="mb-7 flex items-center justify-center gap-2 md:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-700 text-xl font-extrabold text-white">
                J
              </span>
              <span className="text-xl font-bold text-gray-900">
                JobFinder
              </span>
            </Link>

            <div className="mb-7">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-purple-600">
                Get Started Today
              </span>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Join JobFinder and start your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Role */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Create Account As
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "applicant", label: "Job Seeker", icon: "👨‍💻" },
                    { value: "recruiter", label: "Recruiter", icon: "🏢" },
                  ].map((role) => (
                    <motion.button
                      key={role.value}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      disabled={isLoading}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          role: role.value,
                        }))
                      }
                      className={`rounded-xl border p-3 text-center transition-all ${
                        formData.role === role.value
                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
                          : "border-gray-200 text-gray-500 hover:border-purple-200"
                      }`}
                    >
                      <span className="block text-xl">{role.icon}</span>
                      <span className="mt-1 block text-xs font-bold">
                        {role.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600"
                    >
                      ⚠️ {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms */}
              <p className="text-xs leading-5 text-gray-500">
                By creating an account, you agree to our{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                disabled={isLoading}
                className="w-full rounded-xl bg-purple-700 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Create Account →"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-purple-600 transition hover:text-purple-800"
              >
                Login
              </Link>
            </p>

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <Link
                to="/"
                className="text-xs font-semibold text-gray-400 transition hover:text-purple-600"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default Signup;
