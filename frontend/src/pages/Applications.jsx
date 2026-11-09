
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'

import applications from '../data/applications'

const Applications = () => {
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Available application statuses
  const statuses = [
    'All',
    'Under Review',
    'Shortlisted',
    'Rejected'
  ]

  // Filter applications according to selected status
  const filteredApplications =
    selectedStatus === 'All'
      ? applications
      : applications.filter(
          (application) => application.status === selectedStatus
        )

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-700'

      case 'Rejected':
        return 'bg-red-100 text-red-700'

      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Track and manage all your job applications.
            </p>

          </div>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <Sidebar role="applicant" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              <section className="bg-white border border-gray-200 rounded-2xl p-6">

                {/* Section Heading */}
                <SectionTitle
                  title="Application History"
                  subtitle={`You have submitted ${applications.length} applications.`}
                />

                {/* Status Filters */}
                <div className="flex flex-wrap gap-3 mt-6 mb-8">

                  {statuses.map((status) => (

                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedStatus === status
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                      }`}
                    >
                      {status}
                    </button>

                  ))}

                </div>

                {/* Applications List */}
                {filteredApplications.length > 0 ? (

                  <div className="space-y-4">

                    {filteredApplications.map((application) => (

                      <div
                        key={application.id}
                        className="border border-gray-200 rounded-xl p-5 hover:border-purple-200 transition"
                      >

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                          {/* Job Information */}
                          <div className="flex-1">

                            <h3 className="text-lg font-bold text-gray-900">
                              {application.jobTitle}
                            </h3>

                            <p className="text-gray-600 mt-1">
                              {application.company}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">

                              <span>
                                📍 {application.location}
                              </span>

                              <span>
                                💰 {application.salary}
                              </span>

                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                              Applied on:{' '}
                              {new Date(
                                application.appliedDate
                              ).toLocaleDateString('en-IN')}
                            </p>

                          </div>

                          {/* Application Status */}
                          <div className="flex flex-col items-start sm:items-end gap-4">

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}
                            >
                              {application.status}
                            </span>

                            <Link
                              to={`/jobs/${application.jobId}`}
                              className="text-purple-600 text-sm font-semibold hover:text-purple-800"
                            >
                              View Job →
                            </Link>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <EmptyState
                    title="No Applications Found"
                    message="You don't have any applications with this status."
                    buttonText="Explore Jobs"
                    buttonLink="/jobs"
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

export default Applications
