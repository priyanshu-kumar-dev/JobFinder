
const formatDate = (date) => {
  if (!date) {
    return 'Date not available'
  }

  const formattedDate = new Date(date)

  if (isNaN(formattedDate.getTime())) {
    return 'Invalid Date'
  }

  return formattedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export default formatDate
