// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const User = require("../models/User");
// const authCtrl = require("../controllers/authController");

// // Existing routes
// router.post("/register", authCtrl.register);
// router.post("/login", authCtrl.login);

// // ⭐ ADD THIS
// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-passwordHash");
//   res.json({ user });
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const authCtrl = require("../controllers/authController");

// router.post("/register", authCtrl.register);
// router.post("/login", authCtrl.login);

// /* ✅ SAFE ME ROUTE */
// router.get("/me", auth, (req, res) => {
//   res.json({ user: req.user });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authCtrl = require("../controllers/authController");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
