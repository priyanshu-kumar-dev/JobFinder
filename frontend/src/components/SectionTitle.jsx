
import { motion } from 'framer-motion'

const SectionTitle = ({ title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        ease: 'easeOut'
      }}
      className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
    >
      {/* Heading */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-1 shrink-0 rounded-full bg-linear-to-b from-purple-700 to-violet-400"
          />

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="ml-4 mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Optional Action */}
      {action && (
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ y: -2 }}
          className="shrink-0 self-start sm:self-auto"
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}

export default SectionTitle
