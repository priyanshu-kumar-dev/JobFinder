
import { useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: '',
    email: '',
    website: '',
    location: '',
    industry: '',
    size: '',
    founded: '',
    description: '',
  })

  const [message, setMessage] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setCompany((previousCompany) => ({
      ...previousCompany,
      [name]: value,
    }))
  }

  // Save company profile
  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !company.name.trim() ||
      !company.email.trim() ||
      !company.location.trim() ||
      !company.industry ||
      !company.description.trim()
    ) {
      setMessage('Please fill all required fields.')
      return
    }

    setMessage('Company profile saved successfully! (Demo only)')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Company Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your company information and details.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Recruiter Sidebar */}
            <div className="md:w-64 shrink-0">
              <Sidebar role="recruiter" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">

                <SectionTitle
                  title="Company Information"
                  subtitle="Add details about your company."
                />

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                  {/* Company Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={company.name}
                        onChange={handleChange}
                        placeholder="Enter company name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Email *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={company.email}
                        onChange={handleChange}
                        placeholder="company@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                  </div>

                  {/* Website and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Website
                      </label>

                      <input
                        type="url"
                        name="website"
                        value={company.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={company.location}
                        onChange={handleChange}
                        placeholder="Jaipur, Rajasthan"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                  </div>

                  {/* Industry and Company Size */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>

                      <select
                        name="industry"
                        value={company.industry}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      >
                        <option value="">Select Industry</option>
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>

                      <select
                        name="size"
                        value={company.size}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      >
                        <option value="">Select Company Size</option>
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-200 employees">51-200 employees</option>
                        <option value="201-500 employees">201-500 employees</option>
                        <option value="500+ employees">500+ employees</option>
                      </select>
                    </div>

                  </div>

                  {/* Founded Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Founded Year
                    </label>

                    <input
                      type="number"
                      name="founded"
                      value={company.founded}
                      onChange={handleChange}
                      placeholder="e.g. 2020"
                      min="1800"
                      max={new Date().getFullYear()}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Company Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description *
                    </label>

                    <textarea
                      name="description"
                      value={company.description}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell candidates about your company..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  {/* Message */}
                  {message && (
                    <p className="text-sm text-purple-700 bg-purple-50 p-3 rounded-lg">
                      {message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Save Company Profile
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default CompanyProfile
