
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Logout = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Logout failed.')
        }

        // Clear frontend user data
        localStorage.removeItem('user')
        localStorage.removeItem('jobfinder_profile')

        navigate('/login', { replace: true })
      } catch (err) {
        console.error('Logout error:', err)
        setError(err.message || 'Unable to logout.')
      }
    }

    logoutUser()
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl"
      >
        {error ? (
          <>
            <div className="mb-4 text-5xl">⚠️</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Logout Failed
            </h2>

            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-purple-700 px-6 py-3 font-bold text-white hover:bg-purple-800"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">
              👋
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Logging Out...
            </h2>

            <p className="mt-3 text-gray-500">
              Please wait while we securely log you out.
            </p>

            <div className="mx-auto mt-6 h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700" />
          </>
        )}
      </motion.div>
    </div>
  )
}

export default Logout
