
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const STORAGE_KEY = 'jobfinder_profile'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  education: '',
  skills: '',
  experience: '',
  bio: ''
}

const Profile = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load logged-in user's information
  useEffect(() => {
    const loadProfile = async () => {
      try {
        let savedProfile = {}

        // Load additional locally saved information
        try {
          const saved = localStorage.getItem(STORAGE_KEY)

          if (saved) {
            savedProfile = JSON.parse(saved)
          }
        } catch (error) {
          console.error('Local profile error:', error)
        }

        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load profile.')
        }

        const user = data.user

        setFormData({
          ...initialFormData,
          ...savedProfile,
          name: user.name || '',
          email: user.email || ''
        })
      } catch (error) {
        console.error('Profile loading error:', error)

        setMessage(error.message || 'Unable to load profile.')
        setMessageType('error')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))

    setMessage('')
  }

  // Calculate profile completion
  const completion = useMemo(() => {
    const fields = [
      formData.name,
      formData.email,
      formData.phone,
      formData.location,
      formData.education,
      formData.skills,
      formData.experience,
      formData.bio
    ]

    const completedFields = fields.filter(
      (field) => field.trim().length > 0
    ).length

    return Math.round((completedFields / fields.length) * 100)
  }, [formData])

  // Generate initials
  const initials = useMemo(() => {
    const words = formData.name.trim().split(/\s+/).filter(Boolean)

    if (!words.length) return 'U'

    return words
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('')
  }, [formData.name])

  // Convert skills into an array
  const skillsList = useMemo(() => {
    return formData.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)
  }, [formData.skills])

  // Save profile
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setMessage('Please enter your full name.')
      setMessageType('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setMessage('Please enter a valid email address.')
      setMessageType('error')
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      const profileToSave = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim()
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profileToSave)
      )

      setFormData(profileToSave)
      setMessage('Your profile has been saved successfully!')
      setMessageType('success')
    } catch (error) {
      console.error('Profile save error:', error)
      setMessage('Unable to save profile. Please try again.')
      setMessageType('error')
    } finally {
      setIsSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'

  const labelClass =
    'mb-2 block text-sm font-semibold text-gray-700'

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <div className="mb-8">
            <SectionTitle
              title="Personal Dashboard"
              subtitle="Manage your personal information and professional profile."
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">

            {/* Sidebar */}
            <aside>
              <Sidebar role="applicant" />
            </aside>

            {/* Main Content */}
            <div className="min-w-0 space-y-6">

              {/* Profile Overview */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl bg-linear-to-br from-purple-700 via-purple-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-2xl font-bold shadow-inner">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-bold sm:text-2xl">
                        {isLoading ? 'Loading...' : formData.name || 'Your Name'}
                      </h2>

                      <p className="mt-1 text-sm text-purple-100">
                        Job Applicant
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-purple-100">
                        <MapPin size={15} />
                        {formData.location || 'Add your location'}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:min-w-40">
                    <p className="text-sm text-purple-100">
                      Profile completion
                    </p>

                    <p className="mt-1 text-3xl font-bold">
                      {completion}%
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </div>

                </div>
              </motion.section>

              {/* Profile Form */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
              >
                <div className="mb-7 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                    <User size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Keep your personal information up to date.
                    </p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="py-12 text-center text-sm text-gray-500">
                    Loading your profile...
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Full Name *</label>

                        <div className="relative">
                          <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`${inputClass} pl-11`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Email Address *</label>

                        <div className="relative">
                          <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Your registered email"
                            className={`${inputClass} pl-11 bg-gray-50`}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone and Location */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>Phone Number</label>

                        <div className="relative">
                          <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Location</label>

                        <div className="relative">
                          <MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <label className={labelClass}>Education</label>

                      <div className="relative">
                        <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          placeholder="e.g. B.Tech in Computer Science"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label className={labelClass}>Professional Skills</label>

                      <div className="relative">
                        <Code size={18} className="absolute left-4 top-4 text-gray-400" />

                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          placeholder="React, Node.js, MongoDB, JavaScript"
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <p className="mt-2 text-xs text-gray-400">
                        Separate each skill with a comma.
                      </p>

                      {skillsList.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skillsList.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Experience */}
                    <div>
                      <label className={labelClass}>Work Experience</label>

                      <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pl-11`}
                        >
                          <option value="">Select experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="2-4 years">2-4 years</option>
                          <option value="4-6 years">4-6 years</option>
                          <option value="6+ years">6+ years</option>
                        </select>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className={labelClass}>About Me</label>

                      <div className="relative">
                        <FileText size={18} className="absolute left-4 top-4 text-gray-400" />

                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={5}
                          maxLength={500}
                          placeholder="Write a short professional introduction..."
                          className={`${inputClass} resize-none pl-11`}
                        />
                      </div>

                      <p className="mt-2 text-right text-xs text-gray-400">
                        {formData.bio.length}/500 characters
                      </p>
                    </div>

                    {/* Profile visibility */}
                    <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-purple-800">
                        <ShieldCheck size={18} />
                        Profile visibility
                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        A complete profile helps recruiters understand your skills and professional background.
                      </p>
                    </div>

                    {/* Message */}
                    <AnimatePresence>
                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className={`flex items-center gap-2 rounded-xl p-4 text-sm ${
                            messageType === 'success'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {messageType === 'success'
                            ? <CheckCircle size={18} />
                            : <AlertCircle size={18} />}

                          {message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Save Button */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={17} />
                        {isSaving ? 'Saving...' : 'Save Profile'}
                      </button>
                    </div>

                  </form>
                )}
              </motion.section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Profile
