const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const qCtrl = require("../controllers/questionController");

// 🔥 STATIC FIRST
router.get("/companies/list", qCtrl.getCompanies);
router.get("/company/:company/types", qCtrl.getCompanyTypes);
router.get(
  "/company/:company/types-with-count",
  qCtrl.getCompanyTypesWithCount
);

// 🔥 QUESTION APIs
router.post("/", auth, qCtrl.uploadQuestion);
router.get("/", qCtrl.getQuestions);
router.post("/:id/upvote", auth, qCtrl.upvote);
router.post("/:id/ai-answer", auth, qCtrl.getAIAnswer);
router.get("/:id", qCtrl.getQuestionById);

module.exports = router;
