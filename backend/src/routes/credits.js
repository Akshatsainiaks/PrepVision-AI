const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const ctrl = require("../controllers/creditController");

router.get("/me", auth, ctrl.getMyCredits);

module.exports = router;
