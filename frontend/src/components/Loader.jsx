
import { motion } from 'framer-motion'

const Loader = ({ text = 'Finding the best opportunities...' }) => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center bg-white px-4 py-12">

      {/* Animated Loader */}
      <div className="relative flex h-20 w-20 items-center justify-center">

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-purple-100 border-t-purple-700 border-r-violet-400"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute h-12 w-12 rounded-full border-[3px] border-violet-100 border-b-purple-500"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Center Dot */}
        <motion.div
          className="h-4 w-4 rounded-full bg-purple-700 shadow-lg shadow-purple-300"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

      </div>

      {/* Loading Text */}
      <motion.div
        className="mt-7 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-base font-bold text-gray-800">
          {text}
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Please wait while we prepare everything
        </p>

        {/* Animated Dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-2 w-2 rounded-full bg-purple-600"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

      </motion.div>

    </div>
  )
}

export default Loader
