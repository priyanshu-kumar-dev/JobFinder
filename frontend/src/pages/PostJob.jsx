
import { useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    category: '',
    experience: '',
    description: ''
  })

  const [message, setMessage] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    setMessage('')
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    setMessage(
      'Job details validated successfully. Backend integration is required to publish this job.'
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Post a Job
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new job opening and find the right candidates.
            </p>

          </div>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Recruiter Sidebar */}
            <div className="md:w-64 shrink-0">
              <Sidebar role="recruiter" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              <section className="bg-white border border-gray-200 rounded-2xl p-6">

                <SectionTitle
                  title="Job Information"
                  subtitle="Fill in the details about the position you want to advertise."
                />

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">

                  {/* Job Title and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>

                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Frontend Developer"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>

                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter company name"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                  </div>

                  {/* Location and Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Location *
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Jaipur, India"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary *
                      </label>

                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g. ₹4-6 LPA"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      />
                    </div>

                  </div>

                  {/* Job Type and Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type *
                      </label>

                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      >
                        <option value="">Select job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Category *
                      </label>

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                      >
                        <option value="">Select category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                        <option value="Finance">Finance</option>
                        <option value="Customer Support">Customer Support</option>
                      </select>
                    </div>

                  </div>

                  {/* Experience */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Experience *
                    </label>

                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    >
                      <option value="">Select experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="0-1 years">0-1 Years</option>
                      <option value="1-3 years">1-3 Years</option>
                      <option value="3-5 years">3-5 Years</option>
                      <option value="5+ years">5+ Years</option>
                    </select>

                  </div>

                  {/* Job Description */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Describe the job responsibilities, requirements and skills..."
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
                    />

                  </div>

                  {/* Message */}
                  {message && (
                    <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                      {message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end">

                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition"
                    >
                      Publish Job
                    </button>

                  </div>

                </form>

              </section>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default PostJob
