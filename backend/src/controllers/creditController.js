// const User = require("../models/User");
// const CreditLog = require("../models/CreditLog");

// exports.getMyCredits = async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     const user = await User.findById(userId).select(
//       "name email credits avatar preferences"
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const logs = await CreditLog.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json({ user, logs });
//   } catch (err) {
//     next(err);
//   }
// };

// // 📜 Credit history (unchanged)
// exports.getCreditHistory = async (req, res, next) => {
//   try {
//     const history = await CreditLog.find({ user: req.user._id })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json({ history });
//   } catch (err) {
//     next(err);
//   }
// };


//next acc claude code
const User = require("../models/User");
const CreditLog = require("../models/CreditLog");

/* ═══════════════════════════════════════════
   GET MY CREDITS (balance + recent logs)
   GET /api/credits/me
═══════════════════════════════════════════ */
exports.getMyCredits = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "name email credits avatar preferences"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const logs = await CreditLog.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ user, logs });
  } catch (err) {
    next(err);
  }
};

/* ═══════════════════════════════════════════
   GET CREDIT HISTORY
   GET /api/credits/history
   Query params:
     type   = "all" | "earned" | "spent"
     sort   = "newest" | "oldest"
     page   = number (default 1)
     limit  = number (default 15)
═══════════════════════════════════════════ */
exports.getCreditHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type = "all", sort = "newest", page = 1, limit = 15 } = req.query;

    /* ── Build filter ── */
    const filter = { user: userId };
    if (type === "earned") filter.value = { $gt: 0 };
    if (type === "spent")  filter.value = { $lt: 0 };

    /* ── Sort ── */
    const sortOp = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    /* ── Paginate ── */
    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      CreditLog.find(filter).sort(sortOp).skip(skip).limit(limitNum).lean(),
      CreditLog.countDocuments(filter),
    ]);

    /* ── All-time stats (ignores type filter) ── */
    const allLogs = await CreditLog.find({ user: userId }).lean();

    const totalEarned = allLogs
      .filter((l) => l.value > 0)
      .reduce((s, l) => s + l.value, 0);

    const totalSpent = Math.abs(
      allLogs.filter((l) => l.value < 0).reduce((s, l) => s + l.value, 0)
    );

    /* ── Current balance from User ── */
    const user = await User.findById(userId).select("credits").lean();
    const balance = user?.credits ?? 0;

    /* ── This month stats ── */
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const thisMonthLogs = allLogs.filter(
      (l) => new Date(l.createdAt) >= monthStart
    );
    const earnedThisMonth = thisMonthLogs
      .filter((l) => l.value > 0)
      .reduce((s, l) => s + l.value, 0);
    const spentThisMonth = Math.abs(
      thisMonthLogs.filter((l) => l.value < 0).reduce((s, l) => s + l.value, 0)
    );

    res.json({
      history: logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: pageNum < Math.ceil(total / limitNum),
      },
      stats: {
        balance,
        totalEarned,
        totalSpent,
        earnedThisMonth,
        spentThisMonth,
        totalTransactions: allLogs.length,
      },
    });
  } catch (err) {
    next(err);
  }
};