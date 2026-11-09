
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import jobs from '../data/jobs'
import { toggleSavedJob } from '../utils/savedJobs'

const JobDetails = () => {
  const { id } = useParams()
  const [isSaved, setIsSaved] = useState(false)

  const job = jobs.find((item) => String(item.id || item._id) === id)

  const formattedSalary =
    typeof job?.salary === 'number'
      ? `₹${job.salary.toLocaleString('en-IN')}`
      : job?.salary || 'Not disclosed'

  const handleApply = () => {
    alert('Application functionality will be added with backend authentication.')
  }

  if (!job) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100 text-4xl">
            🔍
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Job Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            Sorry, this job does not exist or may have been removed.
          </p>

          <Link
            to="/jobs"
            className="mt-7 rounded-xl bg-purple-700 px-7 py-3 font-semibold text-white transition hover:bg-purple-800"
          >
            Browse All Jobs →
          </Link>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pb-16">

        {/* Hero Header */}
        <section className="bg-linear-to-br from-purple-950 via-purple-800 to-purple-600 px-5 py-12 text-white sm:px-6">
          <div className="mx-auto max-w-6xl">

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-medium text-purple-200 transition hover:text-white"
            >
              ← Back to Jobs
            </Link>

            <div className="mt-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

              <div className="flex items-center gap-4">

                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl font-extrabold shadow-lg"
                  style={{
                    color: job.logoColor || '#7C3AED'
                  }}
                >
                  {job.logo || job.company?.charAt(0) || 'J'}
                </div>

                <div>
                  <span className="text-sm font-medium text-purple-200">
                    {job.company}
                  </span>

                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-4xl">
                    {job.title}
                  </h1>

                  <p className="mt-2 text-sm text-purple-200">
                    📍 {job.location || 'Location not specified'}
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {isSaved ? '♥ Saved' : '♡ Save Job'}
                </button>

                <button
                  type="button"
                  onClick={handleApply}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-purple-800 shadow-lg transition hover:bg-purple-50"
                >
                  Apply Now →
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-7 px-5 py-10 sm:px-6 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">

            {/* Job Overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-extrabold text-gray-900">
                Job Overview
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Key information about this opportunity.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl">
                    💰
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Monthly Salary
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {formattedSalary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    💼
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Employment Type
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {job.type || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                    🌐
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Work Mode
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {job.workMode || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    🎓
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Experience
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {job.experience || 'Not specified'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-extrabold text-gray-900">
                Job Description
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-gray-600">
                {job.description || 'No description available.'}
              </p>

            </div>

            {/* Requirements */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-extrabold text-gray-900">
                Requirements & Skills
              </h2>

              {job.requirements?.length > 0 ? (
                <ul className="mt-6 space-y-4">
                  {job.requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                        ✓
                      </span>

                      {requirement}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-gray-500">
                  Requirements not specified.
                </p>
              )}

            </div>

            {/* About Company */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-extrabold text-gray-900">
                About Company
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-gray-600">
                {job.aboutCompany || 'Company information not available.'}
              </p>

            </div>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">

            {/* Apply Card */}
            <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">

              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
                Interested in this role?
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
                Take the next step.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Apply for this opportunity and move closer to your career goals.
              </p>

              <button
                type="button"
                onClick={handleApply}
                className="mt-6 w-full rounded-xl bg-purple-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-purple-100 transition hover:bg-purple-800"
              >
                Apply for this Job →
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="mt-3 w-full rounded-xl border border-purple-200 px-5 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                {isSaved ? '♥ Saved to Your List' : '♡ Save for Later'}
              </button>

            </div>

            {/* Job Activity */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="font-bold text-gray-900">
                Job Activity
              </h3>

              <div className="mt-5 space-y-5">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Applicants
                  </span>

                  <span className="font-bold text-gray-900">
                    {job.applicants || 0}+
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Posted
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {job.postedAt || 'Recently'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Job Type
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {job.type || 'Not specified'}
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default JobDetails
