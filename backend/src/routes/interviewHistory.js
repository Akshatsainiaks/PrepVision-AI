// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const InterviewSession = require("../models/InterviewSession");

// // Get last 5 interview sessions
// router.get("/", auth, async (req, res) => {
//   try {
//     const sessions = await InterviewSession.find({ user: req.user.id })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({ sessions });
//   } catch (err) {
//     console.error("Error fetching interview history:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");

// const InterviewSession = require("../models/InterviewSession");
// const WrittenInterviewSession = require("../models/WrittenInterviewSession");

// /**
//  * GET /api/interview-history
//  * Returns recent LIVE + WRITTEN interviews
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     /* ================= LIVE INTERVIEWS ================= */
//     const liveSessions = await InterviewSession.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .lean();

//     const live = liveSessions.map((s) => ({
//       ...s,
//       type: "LIVE",
//     }));

//     /* ================= WRITTEN INTERVIEWS ================= */
//     const writtenSessions = await WrittenInterviewSession.find({
//       user: userId,
//       status: "COMPLETED",
//     })
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .lean();

//     const written = writtenSessions.map((s) => ({
//       ...s,
//       type: "WRITTEN",
//     }));

//     /* ================= MERGE & SORT ================= */
//     const sessions = [...live, ...written]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);

//     res.json({ sessions });
//   } catch (err) {
//     console.error("Error fetching interview history:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


// next acc claude code
const express = require("express");
const router  = express.Router();
const auth    = require("../middlewares/auth");

const InterviewSession        = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const LiveInterviewSession    = require("../models/LiveInterviewSession");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { type = "ALL", sort = "newest", search = "", page = 1, limit = 10 } = req.query;

    const [oldLiveSessions, newLiveSessions, writtenSessions] = await Promise.all([
      type === "WRITTEN" ? [] : InterviewSession.find({ user: userId }).lean().catch(() => []),
      type === "WRITTEN" ? [] : LiveInterviewSession.find({ user: userId, status: "COMPLETED" }).lean().catch(() => []),
      type === "LIVE"    ? [] : WrittenInterviewSession.find({ user: userId, status: "COMPLETED" }).lean().catch(() => []),
    ]);

    const oldLive = oldLiveSessions.map((s) => {
      const qs   = s.questions || [];
      const avg  = qs.length ? Math.round((qs.reduce((sum, q) => sum + (q.aiScore||0), 0) / qs.length / 10) * 100) : 0;
      const topics = [...new Set(qs.map(q => q.topic).filter(Boolean))];
      return { _id: s._id, type: "LIVE", company: s.company||"General", role: s.role||"Software Engineer",
        topic: topics.join(", ")||s.topic||"Mixed", score: avg, rawScore: s.overallScore||0,
        questionsCount: qs.length, status: "COMPLETED", difficulty: s.difficulty||"Medium",
        reportUrl: null, createdAt: s.createdAt };
    });

    const newLive = newLiveSessions.map((s) => {
      const qs  = s.questions || [];
      const avg = s.overallScore != null
        ? Math.round((s.overallScore / 10) * 100)
        : qs.length ? Math.round((qs.reduce((sum, q) => sum + (q.aiScore||0), 0) / qs.length / 10) * 100) : 0;
      return { _id: s._id, type: "LIVE", company: "General", role: s.role||"Software Engineer",
        topic: s.topic||"Mixed", score: avg, rawScore: s.overallScore||0,
        questionsCount: qs.length, status: "COMPLETED", difficulty: s.difficulty||"Medium",
        reportUrl: `/mock/live/report/${s._id}`, createdAt: s.createdAt };
    });

    const written = writtenSessions.map((s) => ({
      _id: s._id, type: "WRITTEN", company: s.company||"General", role: s.role||"Software Engineer",
      topic: s.topic||"Mixed",
      score: s.overallScore != null ? Math.round((s.overallScore/10)*100) : 0,
      rawScore: s.overallScore||0, questionsCount: s.questions?.length||0,
      status: "COMPLETED", difficulty: s.difficulty||"Medium",
      reportUrl: `/mock/written/report/${s._id}`, createdAt: s.createdAt,
    }));

    // Merge + deduplicate
    const seen = new Set();
    let sessions = [...newLive, ...oldLive, ...written].filter((s) => {
      const id = String(s._id);
      if (seen.has(id)) return false;
      seen.add(id); return true;
    });

    if (search.trim()) {
      const q = search.toLowerCase();
      sessions = sessions.filter(s =>
        s.company?.toLowerCase().includes(q) ||
        s.role?.toLowerCase().includes(q)    ||
        s.topic?.toLowerCase().includes(q)
      );
    }

    sessions.sort((a, b) => {
      if (sort === "oldest")  return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "highest") return b.score - a.score;
      if (sort === "lowest")  return a.score - b.score;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const totalSessions = sessions.length;
    const avgScore      = totalSessions ? Math.round(sessions.reduce((s, x) => s + x.score, 0) / totalSessions) : 0;
    const pageNum       = Math.max(1, parseInt(page));
    const limitNum      = Math.min(50, Math.max(1, parseInt(limit)));
    const paginated     = sessions.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.json({
      sessions: paginated,
      pagination: { page: pageNum, limit: limitNum, total: totalSessions, totalPages: Math.ceil(totalSessions / limitNum), hasMore: pageNum < Math.ceil(totalSessions / limitNum) },
      stats: { totalSessions, avgScore, liveCount: sessions.filter(s => s.type==="LIVE").length, writtenCount: sessions.filter(s => s.type==="WRITTEN").length },
    });
  } catch (err) {
    console.error("Interview history error:", err);
    res.status(500).json({ message: "Server error fetching history" });
  }
});

module.exports = router;