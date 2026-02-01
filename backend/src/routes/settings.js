const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  updateSecurity,
  updatePrivacy,
  deleteAccount,
  getSettings,
} = require("../controllers/settings.controller");

router.get("/", auth, getSettings);
router.put("/security", auth, updateSecurity);
router.put("/privacy", auth, updatePrivacy);
router.delete("/account", auth, deleteAccount);

module.exports = router;
