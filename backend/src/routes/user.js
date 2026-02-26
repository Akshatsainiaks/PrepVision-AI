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


// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");

// const {
//   getUserProfile,
//   followUser,
//   unfollowUser,
// } = require("../controllers/userController");

// /* ===== USER PROFILE (NO PARAM IN URL) ===== */
// router.get("/userprofile", auth, getUserProfile);

// /* ===== FOLLOW ===== */
// router.post("/:id/follow", auth, followUser);

// /* ===== UNFOLLOW ===== */
// router.post("/:id/unfollow", auth, unfollowUser);

// module.exports = router;

//before is live 
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("multer");

const {
  getUserProfile,
  followUser,
  unfollowUser,
  uploadAvatar,
  removeAvatar,
  updatePreferences,
} = require("../controllers/userController");

// ✅ Multer — memory storage for Cloudinary base64 upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
});

/* ===== AVATAR UPLOAD ===== */
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

/* ===== AVATAR REMOVE ===== */
router.delete("/avatar", auth, removeAvatar);

/* ===== UPDATE PREFERENCES ===== */
router.put("/preferences", auth, updatePreferences);

/* ===== USER PROFILE ===== */
router.get("/userprofile", auth, getUserProfile);

/* ===== FOLLOW ===== */
router.post("/:id/follow", auth, followUser);

/* ===== UNFOLLOW ===== */
router.post("/:id/unfollow", auth, unfollowUser);

module.exports = router;