const User = require("../models/User");
const CreditLog = require("../models/CreditLog");

exports.getMyCredits = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "name email credits avatar preferences"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const logs = await CreditLog.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ user, logs });
  } catch (err) {
    next(err);
  }
};

// 📜 Credit history (unchanged)
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
