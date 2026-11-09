import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getFrontendRole = (role) =>
  role === "candidate" ? "applicant" : role;

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env");
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sendUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: getFrontendRole(user.role),
  companyName: user.companyName || "",
});

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedRole =
      role === "applicant" ? "candidate" : role || "candidate";

    if (!["candidate", "recruiter"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account role.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: normalizedRole,
      ...(normalizedRole === "recruiter" && companyName
        ? { companyName: companyName.trim() }
        : {}),
    });

    const token = createToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: sendUserResponse(user),
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const requestedRole =
      role === "applicant" ? "candidate" : role;

    if (requestedRole && requestedRole !== user.role) {
      return res.status(403).json({
        success: false,
        message: "You selected the wrong account type.",
      });
    }

    const token = createToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: sendUserResponse(user),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

// CURRENT USER
export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: sendUserResponse(req.user),
  });
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    ...cookieOptions,
    maxAge: undefined,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};


const defaultSettings = {
  emailNotifications: true,
  jobAlerts: true,
  applicationUpdates: true,
  profileVisibility: true,
  marketingEmails: false,
};

// GET SETTINGS
export const getSettings = async (req, res) => {
  try {
    const settings = {
      ...defaultSettings,
      ...(req.user.settings?.toObject?.() || req.user.settings || {}),
    };

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load settings.",
    });
  }
};

// UPDATE SETTINGS
export const updateSettings = async (req, res) => {
  try {
    const allowedFields = Object.keys(defaultSettings);
    const updatedSettings = {};

    for (const field of allowedFields) {
      if (typeof req.body[field] !== "boolean") {
        return res.status(400).json({
          success: false,
          message: `Invalid value for ${field}.`,
        });
      }

      updatedSettings[field] = req.body[field];
    }

    req.user.settings = updatedSettings;

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update settings.",
    });
  }
};
