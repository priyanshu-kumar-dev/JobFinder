
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'

import jobsData from '../data/jobs'

const ManageJobs = () => {
  const [jobs, setJobs] = useState(jobsData)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  // Delete job
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this job?'
    )

    if (confirmDelete) {
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      )
    }
  }

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesType =
      selectedType === 'All' || job.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage Jobs
              </h1>

              <p className="text-gray-500 mt-2">
                View, search and manage your job listings.
              </p>
            </div>

            <Link
              to="/post-job"
              className="w-fit bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              + Post New Job
            </Link>

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
                  title="Your Job Listings"
                  subtitle={`${jobs.length} total jobs available.`}
                />

                {/* Search and Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-8">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by job title or company..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  />

                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  >
                    <option value="All">All Job Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>

                </div>

                {/* Job Listings */}
                {filteredJobs.length > 0 ? (

                  <div className="space-y-4">

                    {filteredJobs.map((job) => (

                      <div
                        key={job.id}
                        className="border border-gray-200 rounded-xl p-5"
                      >

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                          {/* Job Information */}
                          <div className="flex-1">

                            <h3 className="text-lg font-bold text-gray-900">
                              {job.title}
                            </h3>

                            <p className="text-gray-600 mt-1">
                              {job.company}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">

                              <span>
                                📍 {job.location}
                              </span>

                              <span>
                                💰 {job.salary}
                              </span>

                              <span>
                                💼 {job.type}
                              </span>

                            </div>

                            <p className="text-sm text-gray-500 mt-3">
                              {job.category} • {job.experience}
                            </p>

                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-3">

                            <Link
                              to={`/jobs/${job.id}`}
                              className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-semibold transition"
                            >
                              View
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(job.id)}
                              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition"
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <EmptyState
                    title="No Jobs Found"
                    message="Try changing your search or job type filter."
                    buttonText="Post a Job"
                    buttonLink="/post-job"
                  />

                )}

              </section>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default ManageJobs
