const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const qCtrl = require("../controllers/questionController");

router.get("/companies/list", qCtrl.getCompanies);
router.get("/company/:company/types", qCtrl.getCompanyTypes);

router.post("/", auth, qCtrl.uploadQuestion);
router.get("/", qCtrl.getByCompanyRole);
router.post("/:id/upvote", auth, qCtrl.upvote);
router.get("/:id", qCtrl.getQuestionById);
router.get(
  "/company/:company/types-with-count",
  qCtrl.getCompanyTypesWithCount
);

module.exports = router;
