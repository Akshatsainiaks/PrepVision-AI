const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const authCtrl = require("../controllers/authController");

// Existing routes
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

// ⭐ ADD THIS
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json({ user });
});

module.exports = router;
