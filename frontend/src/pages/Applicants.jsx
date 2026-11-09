
import { useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'

import applicationsData from '../data/applications'

const Applicants = () => {
  const [applications, setApplications] = useState(applicationsData)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Update application status
  const handleStatusChange = (applicationId, newStatus) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === applicationId
          ? { ...application, status: newStatus }
          : application
      )
    )
  }

  // Filter applicants
  const filteredApplications = applications.filter((application) => {
    const applicantName =
      application.applicantName ||
      application.name ||
      'Job Applicant'

    const jobTitle =
      application.jobTitle ||
      application.title ||
      ''

    const matchesSearch =
      applicantName.toLowerCase().includes(search.toLowerCase()) ||
      jobTitle.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      selectedStatus === 'All' ||
      (application.status || 'Pending') === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-700'

      case 'Accepted':
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
              Applicants
            </h1>

            <p className="text-gray-500 mt-2">
              Review candidates and manage their job applications.
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
                  title="All Applicants"
                  subtitle={`${applications.length} total applications received.`}
                />

                {/* Search and Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-8">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search applicant or job title..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  />

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  >
                    <option value="All">All Applications</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                </div>

                {/* Applicants List */}
                {filteredApplications.length > 0 ? (

                  <div className="space-y-4">

                    {filteredApplications.map((application) => {

                      const applicantName =
                        application.applicantName ||
                        application.name ||
                        'Job Applicant'

                      const jobTitle =
                        application.jobTitle ||
                        application.title ||
                        'Job Position'

                      const status = application.status || 'Pending'

                      return (

                        <div
                          key={application.id}
                          className="border border-gray-200 rounded-xl p-5"
                        >

                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* Applicant Information */}
                            <div className="flex items-start gap-4 flex-1">

                              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                                {applicantName
                                  .split(' ')
                                  .map((word) => word[0])
                                  .join('')
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">

                                <h3 className="font-bold text-gray-900">
                                  {applicantName}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                  Applied for: {jobTitle}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                  {application.email || 'Email not available'}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                  Applied on:{' '}
                                  {application.appliedDate
                                    ? new Date(
                                        application.appliedDate
                                      ).toLocaleDateString('en-IN')
                                    : 'Date not available'}
                                </p>

                              </div>

                            </div>

                            {/* Application Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                              <span
                                className={`w-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}
                              >
                                {status}
                              </span>

                              <select
                                value={status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    application.id,
                                    e.target.value
                                  )
                                }
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>

                            </div>

                          </div>

                        </div>

                      )
                    })}

                  </div>

                ) : (

                  <EmptyState
                    title="No Applicants Found"
                    message="No applications match your search or selected status."
                    buttonText="Manage Jobs"
                    buttonLink="/manage-jobs"
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

export default Applicants
