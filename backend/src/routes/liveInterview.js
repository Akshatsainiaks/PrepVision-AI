const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  startLiveInterview,
  submitLiveAnswer,
  finishLiveInterview,
} = require("../controllers/liveInterviewController");

const LiveInterviewSession = require("../models/LiveInterviewSession");

router.post("/start", auth, startLiveInterview);
router.post("/answer", auth, submitLiveAnswer);
router.post("/finish", auth, finishLiveInterview);

router.get("/session/:id", auth, async (req, res) => {
  const session = await LiveInterviewSession.findById(req.params.id);
  if (!session) return res.status(404).json({ message: "Not found" });
  res.json(session);
});

module.exports = router;
