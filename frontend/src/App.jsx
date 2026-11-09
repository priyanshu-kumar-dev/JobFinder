
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Companies from "./pages/Companies";
import ForgotPassword from "./pages/ForgotPassword";

// Applicant Pages
import ApplicantDashboard from "./pages/ApplicantDashboard";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";

// Recruiter Pages
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import Applicants from "./pages/Applicants";
import CompanyProfile from "./pages/CompanyProfile";

// Shared Pages
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";
import Logout from './pages/Logout'



function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Applicant Routes */}
        <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/profile" element={<Profile />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/company-profile" element={<CompanyProfile />} />

        {/* Shared Routes */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
