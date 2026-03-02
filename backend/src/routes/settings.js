// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const {
//   updateSecurity,
//   updatePrivacy,
//   deleteAccount,
//   getSettings,
// } = require("../controllers/settings.controller");

// router.get("/", auth, getSettings);
// router.put("/security", auth, updateSecurity);
// router.put("/privacy", auth, updatePrivacy);
// router.delete("/account", auth, deleteAccount);

// module.exports = router;

//next acc claude code

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getSettings,
  updateAccount,
  changePassword,
  updateSecurity,
  updatePrivacy,
  updatePreferences,
  deleteAccount,
} = require("../controllers/settings.controller");

// GET current settings
router.get("/", auth, getSettings);

// PATCH account info (name, username, email)
router.patch("/account", auth, updateAccount);

// PATCH change password
router.patch("/password", auth, changePassword);

// PUT security (2FA toggle)
router.put("/security", auth, updateSecurity);

// PUT privacy (profile public toggle)
router.put("/privacy", auth, updatePrivacy);

// PUT preferences (email notifications)
router.put("/preferences", auth, updatePreferences);

// DELETE account (requires password confirmation)
router.delete("/account", auth, deleteAccount);

module.exports = router;