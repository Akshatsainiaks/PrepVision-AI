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
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");

/**
 * GET /api/interview-history
 * Returns paginated LIVE + WRITTEN interviews with normalized fields
 *
 * Query params:
 *   type     = "ALL" | "LIVE" | "WRITTEN"
 *   sort     = "newest" | "oldest" | "highest" | "lowest"
 *   search   = string (matches topic/company/role)
 *   page     = number (default 1)
 *   limit    = number (default 10)
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { type = "ALL", sort = "newest", search = "", page = 1, limit = 10 } = req.query;

    /* ── Fetch sessions ── */
    const [liveSessions, writtenSessions] = await Promise.all([
      type === "WRITTEN" ? [] :
        InterviewSession.find({ user: userId }).lean(),
      type === "LIVE" ? [] :
        WrittenInterviewSession.find({ user: userId, status: "COMPLETED" }).lean(),
    ]);

    /* ── Normalize LIVE sessions ── */
    const live = liveSessions.map((s) => {
      const questions = s.questions || [];
      const totalScore = questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
      const avgScore = questions.length ? Math.round((totalScore / questions.length / 10) * 100) : 0;

      // Collect unique topics from questions
      const topics = [...new Set(questions.map((q) => q.topic).filter(Boolean))];

      return {
        _id: s._id,
        type: "LIVE",
        company: s.company || "General",
        role: s.role || "Software Engineer",
        topic: topics.join(", ") || "Mixed",
        score: avgScore,           // normalized to %
        rawScore: totalScore,
        questionsCount: questions.length,
        completed: questions.length > 0,
        status: "COMPLETED",
        createdAt: s.createdAt,
      };
    });

    /* ── Normalize WRITTEN sessions ── */
    const written = writtenSessions.map((s) => {
      const score = s.overallScore != null
        ? Math.round((s.overallScore / 10) * 100)  // normalize /10 to %
        : 0;

      return {
        _id: s._id,
        type: "WRITTEN",
        company: s.company || "General",
        role: s.role || "Software Engineer",
        topic: s.topic || "Mixed",
        score,
        rawScore: s.overallScore || 0,
        questionsCount: s.questions?.length || 0,
        completed: true,
        status: "COMPLETED",
        createdAt: s.createdAt,
      };
    });

    /* ── Merge ── */
    let sessions = [...live, ...written];

    /* ── Search: match company, role, topic ── */
    if (search.trim()) {
      const q = search.toLowerCase();
      sessions = sessions.filter(
        (s) =>
          s.company?.toLowerCase().includes(q) ||
          s.role?.toLowerCase().includes(q) ||
          s.topic?.toLowerCase().includes(q)
      );
    }

    /* ── Sort ── */
    sessions.sort((a, b) => {
      if (sort === "oldest")  return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "highest") return b.score - a.score;
      if (sort === "lowest")  return a.score - b.score;
      return new Date(b.createdAt) - new Date(a.createdAt); // newest (default)
    });

    /* ── Summary stats (across all — before pagination) ── */
    const totalSessions = sessions.length;
    const avgScore = totalSessions
      ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / totalSessions)
      : 0;
    const liveCount = sessions.filter((s) => s.type === "LIVE").length;
    const writtenCount = sessions.filter((s) => s.type === "WRITTEN").length;

    /* ── Paginate ── */
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const totalPages = Math.ceil(sessions.length / limitNum);
    const paginated = sessions.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.json({
      sessions: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalSessions,
        totalPages,
        hasMore: pageNum < totalPages,
      },
      stats: {
        totalSessions,
        avgScore,
        liveCount,
        writtenCount,
      },
    });
  } catch (err) {
    console.error("Interview history error:", err);
    res.status(500).json({ message: "Server error fetching history" });
  }
});

module.exports = router;