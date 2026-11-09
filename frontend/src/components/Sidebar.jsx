
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const applicantLinks = [
  { name: 'Dashboard', path: '/applicant-dashboard', icon: '📊' },
  { name: 'Find Jobs', path: '/jobs', icon: '🔍' },
  { name: 'My Applications', path: '/applications', icon: '📄' },
  { name: 'Saved Jobs', path: '/saved-jobs', icon: '❤️' },
  { name: 'My Profile', path: '/profile', icon: '👤' }
]

const recruiterLinks = [
  { name: 'Dashboard', path: '/recruiter-dashboard', icon: '📊' },
  { name: 'Post a Job', path: '/post-job', icon: '➕' },
  { name: 'Manage Jobs', path: '/manage-jobs', icon: '💼' },
  { name: 'Applicants', path: '/applicants', icon: '👥' },
  { name: 'Company Profile', path: '/company-profile', icon: '🏢' }
]

const Sidebar = ({ role = 'applicant' }) => {
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const links = role === 'recruiter'
    ? recruiterLinks
    : applicantLinks

  const handleLogout = async () => {
    if (loggingOut) return

    setLoggingOut(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      localStorage.removeItem('user')
      localStorage.removeItem('jobfinder_profile')

      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
      alert('Logout nahi ho paya. Please try again.')
      setLoggingOut(false)
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="h-fit w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:w-64"
    >
      {/* Profile */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-violet-500 text-2xl shadow-md shadow-purple-200"
        >
          👤
        </motion.div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-gray-900">
            Welcome Back!
          </h3>
          <p className="mt-1 text-xs capitalize text-gray-500">
            {role} Account
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
          Main Menu
        </p>

        <nav className="space-y-1.5">
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.3 }}
            >
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 shadow-sm'
                      : 'text-gray-500 hover:bg-purple-50/70 hover:text-purple-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-indicator"
                        className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-purple-600"
                      />
                    )}

                    <motion.span
                      whileHover={{ scale: 1.15 }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-lg transition-colors group-hover:bg-white"
                    >
                      {link.icon}
                    </motion.span>

                    <span>{link.name}</span>

                    {isActive && (
                      <motion.span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-600"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Account Settings */}
      <div className="mt-7 border-t border-gray-100 pt-5">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
          Account
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
            }`
          }
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-lg">
            ⚙️
          </span>
          Settings
        </NavLink>

        <motion.button
          type="button"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          disabled={loggingOut}
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-lg">
            🚪
          </span>
          {loggingOut ? 'Logging out...' : 'Logout'}
        </motion.button>
      </div>

      {/* Help Card */}
      <div className="mt-6 rounded-xl bg-linear-to-br from-purple-700 to-violet-600 p-4 text-white">
        <p className="text-sm font-bold">Need Help?</p>
        <p className="mt-1 text-xs leading-5 text-purple-100">
          Have questions? Our support team is here to help.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="mt-3 rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/25"
          onClick={() => alert('Support page will be added soon.')}
        >
          Contact Support →
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
