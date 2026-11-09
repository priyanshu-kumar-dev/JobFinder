
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const companies = [
  {
    id: 1,
    name: 'Google',
    category: 'Technology',
    location: 'Bangalore, India',
    jobs: 12,
    logo: 'G',
    color: 'bg-blue-100 text-blue-600',
    description: 'Building helpful products and technology for everyone.'
  },
  {
    id: 2,
    name: 'Amazon',
    category: 'E-commerce',
    location: 'Hyderabad, India',
    jobs: 18,
    logo: 'a',
    color: 'bg-orange-100 text-orange-600',
    description: 'Making online shopping and cloud computing better.'
  },
  {
    id: 3,
    name: 'Microsoft',
    category: 'Technology',
    location: 'Noida, India',
    jobs: 9,
    logo: 'M',
    color: 'bg-sky-100 text-sky-600',
    description: 'Empowering every person and organization to achieve more.'
  },
  {
    id: 4,
    name: 'Meta',
    category: 'Social Media',
    location: 'Mumbai, India',
    jobs: 7,
    logo: '∞',
    color: 'bg-blue-100 text-blue-700',
    description: 'Connecting people and building the future of technology.'
  },
  {
    id: 5,
    name: 'Adobe',
    category: 'Design',
    location: 'Noida, India',
    jobs: 6,
    logo: 'A',
    color: 'bg-red-100 text-red-600',
    description: 'Changing the world through digital experiences.'
  },
  {
    id: 6,
    name: 'Netflix',
    category: 'Entertainment',
    location: 'Mumbai, India',
    jobs: 5,
    logo: 'N',
    color: 'bg-red-100 text-red-600',
    description: 'Creating stories and entertainment for audiences worldwide.'
  }
]

const categories = [
  'All',
  'Technology',
  'E-commerce',
  'Social Media',
  'Design',
  'Entertainment'
]

const Companies = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.category.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        activeCategory === 'All' ||
        company.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-violet-600 px-6 py-20 text-white">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-6xl text-center"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider text-purple-100">
              DISCOVER YOUR FUTURE
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Explore Top
              <span className="block text-purple-200">
                Companies
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-purple-100 sm:text-base">
              Discover amazing companies, explore their work culture
              and find opportunities that match your career goals.
            </p>

            <div className="mx-auto mt-9 max-w-2xl rounded-2xl bg-white p-2 shadow-2xl sm:flex sm:items-center">
              <div className="flex flex-1 items-center gap-3 px-3">
                <span className="text-xl">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search companies or industries..."
                  className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="mt-2 w-full rounded-xl bg-purple-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-800 sm:mt-0 sm:w-auto"
              >
                Search
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <h3 className="text-2xl font-extrabold">500+</h3>
                <p className="mt-1 text-xs text-purple-200">Companies</p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">2K+</h3>
                <p className="mt-1 text-xs text-purple-200">Open Positions</p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">50K+</h3>
                <p className="mt-1 text-xs text-purple-200">Job Seekers</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Companies */}
        <section className="mx-auto max-w-6xl px-6 py-16">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
                Find your workplace
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Featured Companies
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Explore companies hiring talented professionals.
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-500">
              {filteredCompanies.length} Companies Found
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-9 flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-purple-700 text-white shadow-lg shadow-purple-200'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Company Cards */}
          {filteredCompanies.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company, index) => (
                <motion.article
                  key={company.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -7 }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-purple-100"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold ${company.color}`}>
                      {company.logo}
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                      Hiring
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-700">
                    {company.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-purple-600">
                    {company.category}
                  </p>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                    {company.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-500">
                      📍 {company.location}
                    </span>

                    <span className="text-xs font-bold text-purple-700">
                      {company.jobs} Jobs
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`${company.name} company profile will be available soon.`)}
                    className="mt-5 w-full rounded-xl border border-purple-200 py-3 text-sm font-bold text-purple-700 transition hover:border-purple-700 hover:bg-purple-700 hover:text-white"
                  >
                    Explore Company →
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
              <div className="text-5xl">🏢</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No companies found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another company name or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All')
                }}
                className="mt-5 rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-800"
              >
                Clear Filters
              </button>
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  )
}

export default Companies
