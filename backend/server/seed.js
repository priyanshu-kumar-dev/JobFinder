import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Job from "./models/Job.js";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const titles = ["React Developer", "MERN Stack Developer", "Frontend Developer", "Backend Developer", "Full Stack Engineer"];
const companies = ["Google", "Amazon", "Microsoft", "Meta", "Flipkart", "Razorpay"];
const locations = ["Jaipur", "Delhi", "Bangalore", "Pune", "Remote"];
const skillSets = [["react", "tailwind", "redux"], ["node", "express", "mongodb"], ["javascript", "react", "node"]];

await mongoose.connect(process.env.MONGO_URI);
await Job.deleteMany({});

const recruiter =
  (await User.findOne({ role: "recruiter" })) ||
  (await User.create({ name: "HR Team", email: "hr@jobfinder.com", password: "password123", role: "recruiter" }));

const jobs = Array.from({ length: 30 }, () => {
  const location = pick(locations);
  const expMin = pick([0, 1, 3, 5]);
  const salaryMin = pick([25000, 40000, 50000, 60000, 80000]);
  return {
    title: pick(titles),
    company: pick(companies),
    description: "Hum ek passionate developer dhoondh rahe hain jo scalable web applications banaye.",
    requirements: ["JavaScript ki strong samajh", "REST APIs ka experience"],
    skills: pick(skillSets),
    location,
    workMode: location === "Remote" ? "Remote" : pick(["Onsite", "Hybrid"]),
    jobType: pick(["Full-time", "Part-time", "Internship", "Contract"]),
    experienceMin: expMin,
    experienceMax: expMin + 2,
    salaryMin,
    salaryMax: salaryMin + 15000,
    postedBy: recruiter._id,
  };
});

await Job.insertMany(jobs);
console.log("30 jobs seeded");
await mongoose.disconnect();