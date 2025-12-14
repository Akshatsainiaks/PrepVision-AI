const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const ctrl = require("../controllers/interviewController");

router.post("/start", auth, ctrl.startInterview);
router.post("/answer", auth, ctrl.submitAnswer);
router.post("/finish", auth, ctrl.finishInterview);

module.exports = router;
