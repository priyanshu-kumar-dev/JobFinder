
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const EmptyState = ({
  title = 'Nothing Found',
  message = 'There is no data available right now.',
  buttonText = 'Explore Jobs',
  buttonLink = '/jobs'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative isolate overflow-hidden rounded-3xl border border-purple-100 bg-white px-5 py-12 text-center shadow-sm sm:px-10 sm:py-16"
    >
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-violet-100/70 blur-3xl"
      />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.7, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          type: 'spring',
          stiffness: 150
        }}
        aria-hidden="true"
        className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-100 bg-purple-50 text-4xl shadow-sm"
      >
        📭
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto mt-6 max-w-md">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
          {message}
        </p>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-7"
        >
          <Link
            to={buttonLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200/70 transition-colors duration-200 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            {buttonText}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EmptyState
