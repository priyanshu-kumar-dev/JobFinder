
import { motion } from 'framer-motion'

const StatsCard = ({
  title,
  value,
  icon,
  color = 'purple'
}) => {

  const colors = {
    purple: {
      icon: 'bg-purple-100 text-purple-600',
      glow: 'group-hover:shadow-purple-100',
      accent: 'bg-purple-500'
    },
    blue: {
      icon: 'bg-blue-100 text-blue-600',
      glow: 'group-hover:shadow-blue-100',
      accent: 'bg-blue-500'
    },
    green: {
      icon: 'bg-green-100 text-green-600',
      glow: 'group-hover:shadow-green-100',
      accent: 'bg-green-500'
    },
    orange: {
      icon: 'bg-orange-100 text-orange-600',
      glow: 'group-hover:shadow-orange-100',
      accent: 'bg-orange-500'
    },
    red: {
      icon: 'bg-red-100 text-red-600',
      glow: 'group-hover:shadow-red-100',
      accent: 'bg-red-500'
    }
  }

  const selectedColor = colors[color] || colors.purple

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl ${selectedColor.glow}`}
    >

      {/* Top Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`absolute left-0 top-0 h-1 w-full origin-left ${selectedColor.accent}`}
      />

      <div className="flex items-center justify-between gap-3">

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900"
          >
            {value}
          </motion.h3>

          <p className="mt-2 text-xs font-medium text-gray-400">
            Overview
          </p>
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${selectedColor.icon}`}
        >
          {icon}
        </motion.div>

      </div>

      {/* Bottom Decoration */}
      <div className={`absolute -bottom-8 -right-8 h-20 w-20 rounded-full opacity-10 blur-2xl ${selectedColor.accent}`} />

    </motion.div>
  )
}

export default StatsCard
