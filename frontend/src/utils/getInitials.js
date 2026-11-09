
const getInitials = (name) => {
  if (!name) {
    return 'U'
  }

  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

export default getInitials
