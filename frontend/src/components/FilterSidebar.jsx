
import { motion, AnimatePresence } from 'framer-motion'

const FilterGroup = ({
  title,
  group,
  options,
  filters,
  onFilterChange
}) => {
  const currentValues = filters[group] || []

  const toggleFilter = (value) => {
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]

    onFilterChange(group, updatedValues)
  }

  return (
    <div className="mb-7 border-b border-gray-100 pb-6 last:mb-0 last:border-0 last:pb-0">
      <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-900">
        {title}
      </h3>

      <div className="space-y-3">
        {options.map(option => {
          const isChecked = currentValues.includes(option)

          return (
            <label
              key={option}
              className="group flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleFilter(option)}
                className="h-4 w-4 cursor-pointer accent-purple-700 focus:ring-2 focus:ring-purple-200"
              />

              <span
                className={`text-sm transition-colors ${
                  isChecked
                    ? 'font-semibold text-purple-700'
                    : 'text-gray-600 group-hover:text-purple-700'
                }`}
              >
                {option}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset
}) => {
  const selectedCount =
    (filters.type || []).length +
    (filters.workStyle || []).length +
    (filters.minSalary !== '' && filters.minSalary != null ? 1 : 0) +
    (filters.maxSalary !== '' && filters.maxSalary != null ? 1 : 0)

  const handleSalaryChange = (field, value) => {
    onFilterChange(
      field,
      value === '' ? '' : Math.max(0, Number(value))
    )
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="h-fit rounded-2xl border border-purple-100 bg-white p-5 shadow-sm"
    >
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-gray-900">
              Filters
            </h2>

            {selectedCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-100 px-1.5 text-[10px] font-bold text-purple-700">
                {selectedCount}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Refine your job search
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          disabled={selectedCount === 0}
          className="rounded-lg px-3 py-2 text-xs font-bold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset all
        </motion.button>
      </div>

      {/* Employment Type */}
      <FilterGroup
        title="Employment Type"
        group="type"
        options={[
          'Full-time',
          'Part-time',
          'Internship',
          'Contract'
        ]}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {/* Salary Range */}
      <div className="my-7 border-b border-gray-100 pb-6">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Salary Range
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="minSalary"
              className="text-xs font-medium text-gray-500"
            >
              Minimum (₹)
            </label>

            <input
              id="minSalary"
              type="number"
              min="0"
              value={filters.minSalary ?? ''}
              onChange={e =>
                handleSalaryChange('minSalary', e.target.value)
              }
              placeholder="0"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label
              htmlFor="maxSalary"
              className="text-xs font-medium text-gray-500"
            >
              Maximum (₹)
            </label>

            <input
              id="maxSalary"
              type="number"
              min="0"
              value={filters.maxSalary ?? ''}
              onChange={e =>
                handleSalaryChange('maxSalary', e.target.value)
              }
              placeholder="100000"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>
      </div>

      {/* Work Style */}
      <FilterGroup
        title="Work Style"
        group="workStyle"
        options={[
          'Onsite',
          'Hybrid',
          'Remote'
        ]}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {/* Active Filters */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 overflow-hidden"
          >
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-3">
              <p className="text-xs font-semibold text-purple-700">
                {selectedCount} active filter(s)
              </p>

              <p className="mt-1 text-xs leading-5 text-purple-500">
                Your job results update based on your selected filters.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

export default FilterSidebar
