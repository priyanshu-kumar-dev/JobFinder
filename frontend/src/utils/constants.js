
export const APP_NAME = 'JobFinder'

export const USER_ROLES = {
  APPLICANT: 'applicant',
  RECRUITER: 'recruiter'
}

export const JOB_TYPES = [
  'Full Time',
  'Part Time',
  'Internship',
  'Remote',
  'Contract'
]

export const JOB_CATEGORIES = [
  'Development',
  'Design',
  'Marketing',
  'Business',
  'Finance',
  'Customer Support'
]

export const APPLICATION_STATUS = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
  HIRED: 'Hired'
}

export const NAVBAR_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Find Jobs', path: '/jobs' },
  { name: 'Companies', path: '/companies' }
]

export const API_BASE_URL = 'http://localhost:5000/api'
