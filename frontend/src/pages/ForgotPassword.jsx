
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setMessage(
      'Password reset functionality will be available after backend integration.'
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
              🔐
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password?
            </h1>

            <p className="text-gray-500 mt-3">
              Enter your registered email address to reset your password.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
              />

            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            {/* Success Message */}
            {message && (
              <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Submit Request
            </button>

          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-500 mt-7">

            Remember your password?{' '}

            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:text-purple-800"
            >
              Back to Login
            </Link>

          </p>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default ForgotPassword
