// src/routes/learningRoadmap.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const InterviewSession = require("../models/InterviewSession");
const User = require("../models/User");

/**
 * Helper: score topics from sessions
 * returns { topic: { total, lowScores } }
 */
function computeTopicStats(sessions) {
  const map = {};
  sessions.forEach((s) => {
    (s.questions || []).forEach((q) => {
      const topic = (q.topic || "General").toString();
      if (!map[topic]) map[topic] = { total: 0, lowScores: 0, avg: 0 };
      map[topic].total += 1;
      const score = q.aiScore || 0;
      map[topic].avg = ((map[topic].avg * (map[topic].total - 1)) + score) / map[topic].total;
      if (score < 6) map[topic].lowScores += 1;
    });
  });
  return map;
}

/**
 * Build roadmap steps ordered by priority:
 * - Weak topics first (high lowScores/total)
 * - Then medium topics
 * - Then general practice tasks
 */
function buildRoadmapFromStats(topicMap, streak) {
  const topics = Object.keys(topicMap).map((t) => {
    const stats = topicMap[t];
    const weaknessRatio = stats.lowScores / Math.max(1, stats.total);
    return { topic: t, weaknessRatio, avgScore: Number((stats.avg || 0).toFixed(1)), total: stats.total };
  });

  // sort by weakness ratio desc, then avgScore asc
  topics.sort((a, b) => {
    if (b.weaknessRatio !== a.weaknessRatio) return b.weaknessRatio - a.weaknessRatio;
    return a.avgScore - b.avgScore;
  });

  const roadmap = [];

  // For each weak topic -> create 2 milestones: Practice (easy), Deep dive (hard)
  topics.forEach((t, i) => {
    if (t.weaknessRatio > 0) {
      roadmap.push({
        id: `w-${i}-practice`,
        title: `Practice problems: ${t.topic}`,
        description: `Solve 5 practice problems focused on ${t.topic}. Average score: ${t.avgScore}/10.`,
        recommended: "5 problems",
        priority: Math.min(5, Math.ceil(t.weaknessRatio * 5)),
        type: "topic-practice",
        topic: t.topic,
      });

      roadmap.push({
        id: `w-${i}-deep`,
        title: `Deep dive: ${t.topic}`,
        description: `Read theory and watch 1 lesson on ${t.topic}, then solve 2 medium/hard problems.`,
        recommended: "1 lesson + 2 problems",
        priority: Math.min(5, Math.ceil(t.weaknessRatio * 4)),
        type: "topic-deep",
        topic: t.topic,
      });
    }
  });

  // If no weak topics, suggest general path based on streak
  if (roadmap.length === 0) {
    roadmap.push({
      id: "g-practice",
      title: "Practice: Balanced Questions",
      description: "Solve 6 mixed-difficulty questions from the question bank.",
      recommended: "6 problems",
      priority: 1,
      type: "general"
    });

    roadmap.push({
      id: "g-system",
      title: "System Design Primer",
      description: "Watch a 20–30 min system-design primer and solve a small design task.",
      recommended: "1 lesson",
      priority: 1,
      type: "general"
    });
  } else {
    // Add a general weekly milestone
    roadmap.push({
      id: "g-weekly",
      title: "Weekly Review & Mock",
      description: `Take one full mock interview this week. Your current streak helps: ${streak} day(s).`,
      recommended: "1 mock",
      priority: 1,
      type: "general"
    });
  }

  // Add motivational / streak-based bonus
  if ((streak || 0) >= 3) {
    roadmap.unshift({
      id: "bonus-streak",
      title: "Streak Bonus: Focus Session",
      description: `Keep your streak going. Do a focused 30-min practice session today.`,
      recommended: "30 mins",
      priority: 2,
      type: "bonus"
    });
  }

  // add unique incremental ids preserved
  return roadmap;
}

// GET roadmap
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await InterviewSession.find({ user: userId }).sort({ createdAt: -1 });
    const topicMap = computeTopicStats(sessions || []);
    const user = await User.findById(userId);

    const streak = user?.streak || 0;
    const roadmap = buildRoadmapFromStats(topicMap, streak);

    // mark which are completed for this user
    const completed = user?.completedRoadmap || [];
    const roadmapWithState = roadmap.map((r) => ({
      ...r,
      completed: completed.includes(r.id)
    }));

    res.json({ roadmap: roadmapWithState });
  } catch (err) {
    console.error("Learning roadmap error:", err);
    res.status(500).json({ message: "Server error generating roadmap" });
  }
});

// POST mark complete
router.post("/complete", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { milestoneId } = req.body;
    if (!milestoneId) return res.status(400).json({ message: "milestoneId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.completedRoadmap = Array.from(new Set([...(user.completedRoadmap || []), milestoneId]));
    await user.save();

    res.json({ success: true, completed: user.completedRoadmap });
  } catch (err) {
    console.error("Complete roadmap error:", err);
    res.status(500).json({ message: "Server error marking milestone" });
  }
});

module.exports = router;
