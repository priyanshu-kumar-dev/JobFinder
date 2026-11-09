
const validateEmail = (email) => {
  if (!email) {
    return false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailPattern.test(email)
}

export default validateEmail
