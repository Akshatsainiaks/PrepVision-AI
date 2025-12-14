const CreditLog = require("../models/CreditLog");
const User = require("../models/User");

exports.getMyCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("name email credits");

    const logs = await CreditLog.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ user, logs });
  } catch (err) {
    next(err);
  }
};
