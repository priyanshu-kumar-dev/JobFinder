
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Find Jobs', path: '/jobs' },
        { label: 'Companies', path: '/companies' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Job Seekers',
      links: [
        { label: 'Browse Jobs', path: '/jobs' },
        { label: 'Saved Jobs', path: '/saved-jobs' },
        { label: 'My Applications', path: '/applications' },
        { label: 'My Profile', path: '/profile' },
        { label: 'Sign In', path: '/login' }
      ]
    },
    {
      title: 'Employers',
      links: [
        { label: 'Post a Job', path: '/post-job' },
        { label: 'Manage Jobs', path: '/manage-jobs' },
        { label: 'Recruiter Dashboard', path: '/recruiter-dashboard' },
        { label: 'Create Account', path: '/signup' }
      ]
    }
  ]

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 border-b border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:py-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-3"
              aria-label="JobFinder Home"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-700 text-2xl font-extrabold text-white shadow-lg shadow-purple-600/30"
              >
                J
              </motion.div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Job<span className="text-purple-400">Finder</span>
              </span>
            </Link>

            <p className="mb-7 max-w-sm text-sm leading-7 text-slate-400">
              Find opportunities that match your skills, connect with
              great companies, and take the next step in your career.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-slate-400 transition-all hover:-translate-y-1 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                in
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-slate-400 transition-all hover:-translate-y-1 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                GH
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="inline-block text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-purple-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-center"
        >
          <div>
            <span className="mb-3 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
              Ready to find your dream job?
            </h3>

            <p className="text-sm leading-6 text-slate-400">
              Discover new opportunities and build your future.
            </p>
          </div>

          <Link
            to="/jobs"
            className="group inline-flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-600"
          >
            Explore Jobs

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-slate-500">
            © {currentYear} JobFinder. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            Made with <span className="text-red-500">♥</span> for job seekers
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="text-sm font-medium text-slate-400 transition-colors hover:text-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
          >
            Back to top ↑
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer
