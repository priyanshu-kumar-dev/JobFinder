
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const defaultSettings = {
  emailNotifications: true,
  jobAlerts: true,
  applicationUpdates: true,
  profileVisibility: true,
  marketingEmails: false
}

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Load settings from MongoDB
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/settings`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load settings.')
        }

        setSettings({
          ...defaultSettings,
          ...data.settings
        })
      } catch (error) {
        console.error('Settings loading error:', error)
        setMessage(error.message || 'Unable to load settings.')
        setMessageType('error')
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Toggle setting
  const handleChange = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))

    setMessage('')
  }

  // Save settings to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/auth/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(settings)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save settings.')
      }

      setSettings({
        ...defaultSettings,
        ...data.settings
      })

      setMessage('Your settings have been updated successfully!')
      setMessageType('success')
    } catch (error) {
      console.error('Settings save error:', error)
      setMessage(error.message || 'Unable to save settings.')
      setMessageType('error')
    } finally {
      setIsSaving(false)
    }
  }

  const SettingItem = ({ title, description, name, icon }) => (
    <div className="flex items-center justify-between gap-5 border-b border-gray-100 py-5 last:border-b-0">

      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-gray-800">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={settings[name]}
        aria-label={title}
        disabled={isLoading || isSaving}
        onClick={() => handleChange(name)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
          settings[name] ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <motion.span
          animate={{ x: settings[name] ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow-sm"
        />
      </button>

    </div>
  )

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
              Account Preferences
            </span>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your account preferences, notifications and privacy.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8 md:flex-row">

            {/* Sidebar */}
            <div className="shrink-0 md:w-64">
              <Sidebar role="applicant" />
            </div>

            {/* Settings Content */}
            <div className="min-w-0 flex-1">

              {isLoading ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                  <div className="mx-auto size-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading your settings...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Notification Settings */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
                  >
                    <SectionTitle
                      title="Notification Settings"
                      subtitle="Choose which updates you want to receive."
                    />

                    <div className="mt-5">
                      <SettingItem
                        title="Email Notifications"
                        description="Receive important updates through email."
                        name="emailNotifications"
                        icon="📧"
                      />

                      <SettingItem
                        title="Job Alerts"
                        description="Get notified about new job opportunities."
                        name="jobAlerts"
                        icon="💼"
                      />

                      <SettingItem
                        title="Application Updates"
                        description="Receive updates about your job applications."
                        name="applicationUpdates"
                        icon="📋"
                      />

                      <SettingItem
                        title="Marketing Emails"
                        description="Receive news, offers and promotional emails."
                        name="marketingEmails"
                        icon="📢"
                      />
                    </div>
                  </motion.section>

                  {/* Privacy Settings */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
                  >
                    <SectionTitle
                      title="Privacy Settings"
                      subtitle="Control how recruiters can discover your profile."
                    />

                    <div className="mt-5">
                      <SettingItem
                        title="Profile Visibility"
                        description="Allow recruiters to discover your profile."
                        name="profileVisibility"
                        icon="🔒"
                      />
                    </div>
                  </motion.section>

                  {/* Account Information */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"
                  >
                    <SectionTitle
                      title="Account Information"
                      subtitle="Manage your JobFinder account security."
                    />

                    <div className="mt-6 space-y-5">

                      {/* Change Password */}
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                            🔑
                          </div>

                          <div>
                            <h3 className="font-bold text-gray-800">
                              Change Password
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              Update your account password.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setMessage('Password change is not implemented yet.')}
                          className="rounded-xl border border-purple-200 px-5 py-2.5 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
                        >
                          Change Password →
                        </button>
                      </div>

                      <div className="border-t border-gray-100" />

                      {/* Delete Account */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                          🗑️
                        </div>

                        <div>
                          <h3 className="font-bold text-red-600">
                            Delete Account
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Permanently delete your account and associated data.
                          </p>

                          <p className="mt-2 text-xs font-medium text-gray-400">
                            Account deletion is not available yet.
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.section>

                  {/* Message */}
                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${
                          messageType === 'success'
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        }`}
                      >
                        <span className="text-lg">
                          {messageType === 'success' ? '✓' : '⚠'}
                        </span>

                        {message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSaving}
                      className="rounded-xl bg-purple-700 px-8 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? 'Saving...' : 'Save Settings →'}
                    </motion.button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Settings
