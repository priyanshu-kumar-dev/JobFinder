
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: "🎯",
    title: "Right Opportunities",
    description:
      "Discover job opportunities that match your skills, interests and career goals.",
  },
  {
    icon: "🏢",
    title: "Explore Companies",
    description:
      "Learn about companies, explore their work culture and find the right workplace.",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    description:
      "Take the next step in your professional journey with the right opportunities.",
  },
];

const values = [
  {
    icon: "🤝",
    title: "Trust",
    description: "We believe in making job discovery simple and transparent.",
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "We continuously improve the job searching experience.",
  },
  {
    icon: "🌍",
    title: "Opportunity",
    description: "We want to make career opportunities easier to discover.",
  },
];

const About = () => {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-purple-950 via-purple-800 to-violet-700 px-5 py-24 text-white sm:py-28">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-purple-100 backdrop-blur-md">
              About JobFinder
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Connecting Talent With
              <span className="mt-2 block text-purple-200">
                Opportunity
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-purple-100 sm:text-lg">
              We are building a simpler way for people to discover career
              opportunities and for companies to connect with talented people.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/jobs"
                className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-purple-800 shadow-lg transition hover:-translate-y-1 hover:bg-purple-50"
              >
                Explore Jobs →
              </Link>

              <Link
                to="/signup"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Join JobFinder
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Introduction */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-purple-700">
                Who We Are
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                Your Career Journey
                <span className="text-purple-700"> Starts Here.</span>
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                JobFinder is a job discovery platform designed to bring
                job seekers and recruiters together in one place.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Whether you are starting your career, looking for a better
                opportunity or searching for talented candidates, JobFinder
                aims to make the process easier and more accessible.
              </p>

              <Link
                to="/jobs"
                className="mt-8 inline-flex items-center gap-2 font-bold text-purple-700 transition hover:gap-4"
              >
                Find your next opportunity <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl bg-linear-to-br from-purple-100 via-violet-50 to-purple-200 p-8 sm:p-12">
                <div className="rounded-2xl border border-white bg-white p-7 shadow-xl sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                    💼
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-gray-900">
                    Find Work That Matters
                  </h3>

                  <p className="mt-3 leading-7 text-gray-500">
                    Discover opportunities, connect with companies and move
                    closer to your professional goals.
                  </p>

                  <div className="mt-7 space-y-4">
                    {["Discover opportunities", "Explore companies", "Grow your career"].map(
                      (item, index) => (
                        <div key={item} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                            {index + 1}
                          </span>
                          <span className="text-sm font-semibold text-gray-700">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 rounded-2xl bg-purple-700 px-6 py-4 text-white shadow-xl sm:-right-5">
                <p className="text-xs font-medium text-purple-200">
                  Your future
                </p>
                <p className="text-lg font-extrabold">Starts Today ✨</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white p-8 shadow-sm sm:p-10"
            >
              <span className="text-4xl">🎯</span>
              <h3 className="mt-6 text-2xl font-extrabold text-gray-900">
                Our Mission
              </h3>
              <p className="mt-4 leading-8 text-gray-600">
                To make job searching and recruitment easier by creating a
                platform where talent and opportunities can connect.
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl bg-purple-700 p-8 text-white shadow-xl shadow-purple-200 sm:p-10"
            >
              <span className="text-4xl">🔭</span>
              <h3 className="mt-6 text-2xl font-extrabold">
                Our Vision
              </h3>
              <p className="mt-4 leading-8 text-purple-100">
                To become a trusted destination where every job seeker can
                explore possibilities and every recruiter can discover talent.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-purple-700">
                Why JobFinder
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything Starts With The Right Opportunity
              </h2>
              <p className="mt-4 leading-7 text-gray-500">
                Designed to make your job discovery journey simpler.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  whileHover={{ y: -7 }}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-purple-100"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-purple-50/70 px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-purple-700">
                What We Believe
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-7 text-center shadow-sm"
                >
                  <div className="text-4xl">{value.icon}</div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-500">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-3xl bg-linear-to-r from-purple-800 to-violet-700 px-7 py-14 text-center text-white shadow-xl shadow-purple-200 sm:px-14"
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready For Your Next Opportunity?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-purple-100">
              Explore opportunities and take the next step in your career
              journey with JobFinder.
            </p>
            <Link
              to="/jobs"
              className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-purple-800 transition hover:-translate-y-1 hover:bg-purple-50"
            >
              Explore Jobs →
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
