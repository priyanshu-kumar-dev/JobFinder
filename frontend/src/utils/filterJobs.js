
const filterJobs = (jobs, filters = {}) => {
  const {
    search = '',
    location = '',
    category = '',
    type = ''
  } = filters

  return jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      job.location.toLowerCase().includes(location.toLowerCase())

    const matchesCategory =
      !category || job.category === category

    const matchesType =
      !type || job.type === type

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesType
    )
  })
}

export default filterJobs
