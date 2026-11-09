
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'applicant'
  })

  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { email, password, role } = formData

    if (!email.trim() || !password) {
      setError('Please enter email and password.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          role
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.message || data.error || 'Login failed. Please check your credentials.'
        )
      }

      // Check account role returned by backend
      const userRole = data.user?.role || data.user?.userType

      if (userRole && userRole !== role) {
        setError(
          `This account is registered as ${userRole}. Please select the correct account type.`
        )
        return
      }

      navigate(
        role === 'recruiter'
          ? '/recruiter-dashboard'
          : '/applicant-dashboard',
        { replace: true }
      )
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to server. Please check your backend.'
          : err.message
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-5 py-14">

        {/* Background Decorations */}
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
                Your next
                <span className="block text-purple-200">
                  opportunity
                </span>
                starts here.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-purple-100">
                Connect with leading companies, discover exciting roles
                and take the next step in your professional journey.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-yellow-300">
                {'★★★★★'}
              </div>

              <p className="mt-3 text-sm leading-6 text-purple-50">
                "The right opportunity can change your career.
                Start discovering yours today."
              </p>

              <p className="mt-4 text-xs font-semibold text-purple-200">
                YOUR CAREER JOURNEY BEGINS HERE
              </p>
            </div>

          </div>

          {/* Login Form Panel */}
          <div className="p-7 sm:p-10">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-8 flex items-center justify-center gap-2 md:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-700 text-xl font-extrabold text-white">
                J
              </span>
              <span className="text-xl font-bold text-gray-900">
                JobFinder
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-purple-600">
                Welcome Back
              </span>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
                Login to your account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Enter your details to continue your JobFinder journey.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Account Role */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Login As
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'applicant', label: 'Job Seeker', icon: '👨‍💻' },
                    { value: 'recruiter', label: 'Recruiter', icon: '🏢' }
                  ].map((role) => (
                    <motion.button
                      key={role.value}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      disabled={isLoading}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          role: role.value
                        }))
                      }}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        formData.role === role.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                          : 'border-gray-200 text-gray-500 hover:border-purple-200'
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

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50">
                  <span className="text-gray-400">✉</span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-purple-600 transition hover:text-purple-800"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex items-center rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50">
                  <span className="text-gray-400">🔒</span>

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
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

              {/* Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                disabled={isLoading}
                className="w-full rounded-xl bg-purple-700 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Logging in...' : 'Login to Account →'}
              </motion.button>

            </form>

            {/* Register Link */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold text-purple-600 transition hover:text-purple-800"
              >
                Create Account
              </Link>
            </p>

            <div className="mt-8 border-t border-gray-100 pt-5 text-center">
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
  )
}

export default Login
