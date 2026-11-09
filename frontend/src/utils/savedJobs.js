const STORAGE_KEY = 'jobfinder_saved_jobs'

export const getSavedJobs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const toggleSavedJob = (job) => {
  const savedJobs = getSavedJobs()
  const jobId = String(job.id || job._id)

  const exists = savedJobs.some(
    (item) => String(item.id || item._id) === jobId
  )

  const updatedJobs = exists
    ? savedJobs.filter(
        (item) => String(item.id || item._id) !== jobId
      )
    : [...savedJobs, { ...job, id: jobId }]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs))
  window.dispatchEvent(new Event('savedJobsUpdated'))

  return !exists
}