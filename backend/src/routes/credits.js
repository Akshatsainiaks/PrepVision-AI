const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const creditCtrl = require("../controllers/creditController");

// 🧾 Get my credits
router.get("/me", auth, creditCtrl.getMyCredits);

// 📜 Credit history
router.get("/history", auth, creditCtrl.getCreditHistory);

module.exports = router;
