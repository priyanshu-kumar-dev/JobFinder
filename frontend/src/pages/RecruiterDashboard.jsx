
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import StatsCard from '../components/StatsCard'
import SectionTitle from '../components/SectionTitle'
import EmptyState from '../components/EmptyState'

import jobs from '../data/jobs'
import applications from '../data/applications'

import { Link } from 'react-router-dom'

const RecruiterDashboard = () => {

  // Dashboard statistics
  const totalJobs = jobs.length

  const totalApplications = applications.length

  const pendingApplications = applications.filter(
    (application) =>
      ['pending', 'under review'].includes(
        application.status?.toLowerCase()
      )
  ).length

  const shortlistedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === 'shortlisted'
  ).length

  // Recent jobs
  const recentJobs = jobs.slice(0, 5)

  // Recent applications
  const recentApplications = applications.slice(0, 5)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* Page Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your job postings and track candidate applications.
            </p>

          </div>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <Sidebar role="recruiter" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

                <StatsCard
                  title="Total Jobs"
                  value={totalJobs}
                  icon="💼"
                  color="purple"
                />

                <StatsCard
                  title="Applications"
                  value={totalApplications}
                  icon="📄"
                  color="blue"
                />

                <StatsCard
                  title="Pending"
                  value={pendingApplications}
                  icon="⏳"
                  color="yellow"
                />

                <StatsCard
                  title="Shortlisted"
                  value={shortlistedApplications}
                  icon="✅"
                  color="green"
                />

              </div>

              {/* Quick Actions */}
              <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-10">

                <SectionTitle
                  title="Quick Actions"
                  subtitle="Manage your recruitment activities."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  <Link
                    to="/post-job"
                    className="flex items-center gap-4 bg-purple-50 hover:bg-purple-100 p-5 rounded-xl transition"
                  >

                    <span className="text-3xl">➕</span>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Post a Job
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Create a new job opening.
                      </p>
                    </div>

                  </Link>

                  <Link
                    to="/manage-jobs"
                    className="flex items-center gap-4 bg-blue-50 hover:bg-blue-100 p-5 rounded-xl transition"
                  >

                    <span className="text-3xl">📋</span>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Manage Jobs
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        View and manage your job posts.
                      </p>
                    </div>

                  </Link>

                </div>

              </section>

              {/* Recent Job Listings */}
              <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-10">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                  <SectionTitle
                    title="Recent Job Listings"
                    subtitle="Your latest job postings."
                  />

                  <Link
                    to="/manage-jobs"
                    className="text-purple-600 font-semibold text-sm hover:text-purple-800"
                  >
                    View All →
                  </Link>

                </div>

                {recentJobs.length > 0 ? (

                  <div className="space-y-4">

                    {recentJobs.map((job) => (

                      <div
                        key={job.id}
                        className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {job.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {job.company} • {job.location}
                          </p>

                          <p className="text-sm text-purple-600 mt-2">
                            {job.salary}
                          </p>

                        </div>

                        <Link
                          to={`/jobs/${job.id}`}
                          className="w-fit text-purple-600 font-semibold text-sm hover:text-purple-800"
                        >
                          View Job →
                        </Link>

                      </div>

                    ))}

                  </div>

                ) : (

                  <EmptyState
                    title="No Jobs Posted"
                    message="You haven't posted any jobs yet. Create your first job opening."
                    buttonText="Post a Job"
                    buttonLink="/post-job"
                  />

                )}

              </section>

              {/* Recent Applications */}
              <section className="bg-white border border-gray-200 rounded-2xl p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                  <SectionTitle
                    title="Recent Applications"
                    subtitle="Latest applications received from candidates."
                  />

                  <Link
                    to="/applicants"
                    className="text-purple-600 font-semibold text-sm hover:text-purple-800"
                  >
                    View All →
                  </Link>

                </div>

                {recentApplications.length > 0 ? (

                  <div className="space-y-4">

                    {recentApplications.map((application) => (

                      <div
                        key={application.id}
                        className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {application.applicantName ||
                              application.name ||
                              'Job Applicant'}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Applied for: {application.jobTitle || 'Job Position'}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {application.company || 'Company'}
                          </p>

                        </div>

                        <span className="w-fit px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold capitalize">
                          {application.status || 'Pending'}
                        </span>

                      </div>

                    ))}

                  </div>

                ) : (

                  <EmptyState
                    title="No Applications Yet"
                    message="Candidate applications will appear here."
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

export default RecruiterDashboard
