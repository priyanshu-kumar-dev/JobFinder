
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Fetch logged-in user
  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (active) setUser(null);
          return;
        }

        const data = await response.json();

        if (active) {
          setUser(data.user || null);
        }
      } catch (error) {
        console.error("Navbar authentication error:", error);

        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }) =>
    `relative block rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-purple-50 text-purple-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-purple-700"
    }`;

  const dashboardPath =
    user?.role === "recruiter"
      ? "/recruiter-dashboard"
      : "/applicant-dashboard";

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      localStorage.removeItem("user");
      localStorage.removeItem("jobfinder_profile");

      setUser(null);
      setIsProfileOpen(false);
      closeMenu();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to logout. Please try again.");
    }
  };

  const ProfileMenu = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={isProfileOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-purple-200 bg-linear-to-br from-purple-700 to-indigo-600 text-sm font-extrabold text-white shadow-md shadow-purple-200 transition hover:scale-105 hover:border-purple-400"
      >
        {initials}
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-purple-100/50"
          >
            <div className="border-b border-gray-100 bg-purple-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-700 font-bold text-white">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-900">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                {user?.role || "Applicant"}
              </span>
            </div>

            <div className="p-2">
              <Link
                to={dashboardPath}
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
              >
                <span>📊</span>
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
              >
                <span>👤</span>
                My Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
              >
                <span>⚙️</span>
                Settings
              </Link>
            </div>

            <div className="border-t border-gray-100 p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                <span>↪</span>
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
            aria-label="JobFinder Home"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-700 text-2xl font-extrabold text-white shadow-lg shadow-purple-200"
            >
              J
            </motion.div>

            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-gray-900 sm:text-[23px]">
                Job<span className="text-purple-700">Finder</span>
              </h1>

              <p className="-mt-0.5 text-[9px] font-bold uppercase tracking-[2.5px] text-gray-400">
                Find Your Future
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={getLinkClass}
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.name}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-purple-600"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {!loading && user?.role === "recruiter" && (
              <Link
                to="/post-job"
                className="rounded-xl border border-purple-200 px-4 py-2.5 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
              >
                + Post a Job
              </Link>
            )}

            {!loading && !user && (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-purple-700"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-lg"
                >
                  Sign Up
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </>
            )}

            {!loading && user && <ProfileMenu />}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 lg:hidden"
          >
            <motion.span
              key={isMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? "✕" : "☰"}
            </motion.span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-visible lg:hidden"
            >
              <div className="border-t border-gray-100 py-5">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.path === "/"}
                        onClick={closeMenu}
                        className={getLinkClass}
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-5">
                  {!loading && user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-700 font-bold text-white">
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-gray-900">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={dashboardPath}
                        onClick={closeMenu}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50"
                      >
                        📊 Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50"
                      >
                        👤 My Profile
                      </Link>

                      <Link
                        to="/settings"
                        onClick={closeMenu}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50"
                      >
                        ⚙️ Settings
                      </Link>

                      {user.role === "recruiter" && (
                        <Link
                          to="/post-job"
                          onClick={closeMenu}
                          className="block rounded-xl border border-purple-200 py-3 text-center text-sm font-bold text-purple-700"
                        >
                          + Post a Job
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                      >
                        ↪ Logout
                      </button>
                    </div>
                  ) : !loading ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-purple-200 hover:bg-purple-50"
                      >
                        Log In
                      </Link>

                      <Link
                        to="/signup"
                        onClick={closeMenu}
                        className="rounded-xl bg-purple-700 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-purple-800"
                      >
                        Sign Up →
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
