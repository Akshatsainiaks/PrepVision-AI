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

// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const authCtrl = require("../controllers/authController");

// router.post("/register", authCtrl.register);
// router.post("/login", authCtrl.login);

// router.get("/me", auth, (req, res) => {
//   res.json({ user: req.user });
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const authCtrl = require("../controllers/authController");

// router.post("/register", authCtrl.register);
// router.post("/login", authCtrl.login);

// router.get("/myprofile", auth, async (req, res) => {
//   try {
//     const user = await require("../models/User")
//       .findById(req.user._id)
//       .select("-passwordHash")
//       .lean();

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       user: {
//         user_id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         phone: user.phone,
//         avatar: user.avatar,
//         roles: user.roles,
//         credits: user.credits,
//         rank: user.rank,
//         badges: user.badges,
//         followersCount: user.followers?.length || 0,
//         followingCount: user.following?.length || 0,
//         preferences: user.preferences,
//         streak: user.streak,
//         lastActive: user.lastActive,
//         completedRoadmap: user.completedRoadmap,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     });
//   } catch (err) {
//     console.error("My profile error:", err);
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// });

// module.exports = router;

//before is live
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authCtrl = require("../controllers/authController");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

// ✅ Used ONLY by AuthContext — returns ice_id + ice_info for session tracking
router.get("/checkuser", auth, async (req, res) => {
  try {
    // Need fresh DB fetch to get ice_id and ice_info
    const user = await require("../models/User")
      .findById(req.user._id)
      .select("-passwordHash")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        user_id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,      // ✅ for navbar profile photo
        roles: user.roles,
        credits: user.credits,
        ice_id: user.ice_id,      // ✅ unique session identity token
        ice_info: user.ice_info,  // ✅ device/login history array
      },
    });
  } catch (err) {
    console.error("Checkuser error:", err);
    res.status(500).json({ message: "Failed to verify user" });
  }
});

// ✅ Used by Profile page — full user data with DB query
router.get("/myprofile", auth, async (req, res) => {
  try {
    const user = await require("../models/User")
      .findById(req.user._id)
      .select("-passwordHash")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        user_id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,      // ✅ for profile photo display + change
        roles: user.roles,
        credits: user.credits,
        rank: user.rank,
        badges: user.badges,
        followersCount: user.followers?.length || 0,
        followingCount: user.following?.length || 0,
        preferences: user.preferences,
        streak: user.streak,
        lastActive: user.lastActive,
        completedRoadmap: user.completedRoadmap,
        ice_id: user.ice_id,
        ice_info: user.ice_info,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error("My profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;