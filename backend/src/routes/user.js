// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const multer = require("multer");

// const {
//   uploadAvatar,
//   updatePreferences,
// } = require("../controllers/userController");

// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);
// router.put("/preferences", auth, updatePreferences);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

/* ===== USER PROFILE (NO PARAM IN URL) ===== */
router.get("/userprofile", auth, getUserProfile);

/* ===== FOLLOW ===== */
router.post("/:id/follow", auth, followUser);

/* ===== UNFOLLOW ===== */
router.post("/:id/unfollow", auth, unfollowUser);

module.exports = router;