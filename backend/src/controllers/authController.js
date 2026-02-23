// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Load .env values safely
// const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// // Generate token
// const generateToken = (id) => {
//   return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

// // RESPONSE FORMAT (Recommended)
// const sendUserResponse = (res, user, token) => {
//   res.status(200).json({
//     success: true,
//     message: "Authenticated successfully",
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       credits: user.credits,
//       roles: user.roles,
//       createdAt: user.createdAt,
//     },
//   });
// };

// /* ------------------------------ REGISTER ------------------------------ */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and password are required",
//       });
//     }

//     const normalizedEmail = email.toLowerCase();

//     const exists = await User.findOne({ email: normalizedEmail });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await User.create({
//       name,
//       email: normalizedEmail,
//       phone,
//       passwordHash,
//     });

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);

//   } catch (err) {
//     console.error("Register error:", err);
//     return res.status(500).json({ success: false, message: "Server error during registration" });
//   }
// };

// /* -------------------------------- LOGIN ------------------------------- */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const normalizedEmail = email.toLowerCase();
//     const user = await User.findOne({ email: normalizedEmail });

//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash || "");
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);

//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ success: false, message: "Server error during login" });
//   }
// };


// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is missing in .env");
// }

// const generateToken = (id) => {
//   return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

// const sendUserResponse = (res, user, token) => {
//   res.status(200).json({
//     success: true,
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       credits: user.credits,
//       roles: user.roles,
//       createdAt: user.createdAt,
//     },
//   });
// };

// /* ================= REGISTER ================= */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const normalizedEmail = email.toLowerCase();
//     const exists = await User.findOne({ email: normalizedEmail });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await User.create({
//       name,
//       email: normalizedEmail,
//       phone,
//       passwordHash,
//     });

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Registration failed" });
//   }
// };

// /* ================= LOGIN ================= */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.passwordHash);
//     if (!match) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed" });
//   }
// };


// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const generateUsername = require("../utils/generateUsername");

// const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

// const generateToken = (id) =>
//   jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// const sendUserResponse = (res, user, token) => {
//   res.status(200).json({
//     success: true,
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       roles: user.roles,
//       credits: user.credits,
//       createdAt: user.createdAt,
//     },
//   });
// };

// /* ================= REGISTER ================= */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const normalizedEmail = email.toLowerCase();

//     const exists = await User.findOne({
//       $or: [{ email: normalizedEmail }, { phone }],
//     });

//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
//     const username = await generateUsername(name);

//     const user = await User.create({
//       name,
//       username,
//       email: normalizedEmail,
//       phone,
//       passwordHash,
//     });

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Registration failed" });
//   }
// };

// /* ================= LOGIN ================= */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.passwordHash);
//     if (!match) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     return sendUserResponse(res, user, token);
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed" });
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateUsername = require("../utils/generateUsername");

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

/* ===== Generate Token ===== */
const generateToken = (user_id) =>
  jwt.sign({ user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

/* ===== Send User Response ===== */
const sendUserResponse = (res, user, token) => {
  res.status(200).json({
    success: true,
    token,
    user: {
      user_id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      credits: user.credits,
      createdAt: user.createdAt,
    },
  });
};

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const normalizedEmail = email.toLowerCase();

    const exists = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const username = await generateUsername(name);

    const user = await User.create({
      name,
      username,
      email: normalizedEmail,
      phone,
      passwordHash,
    });

    const token = generateToken(user._id);

    return sendUserResponse(res, user, token);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    return sendUserResponse(res, user, token);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};