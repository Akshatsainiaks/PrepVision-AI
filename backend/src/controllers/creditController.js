const User = require("../models/User");
const CreditLog = require("../models/CreditLog");

// 💎 Get logged-in user's credits
exports.getMyCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("credits");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ credits: user.credits });
  } catch (err) {
    next(err);
  }
};

// 📜 Credit history
exports.getCreditHistory = async (req, res, next) => {
  try {
    const history = await CreditLog.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ history });
  } catch (err) {
    next(err);
  }
};
