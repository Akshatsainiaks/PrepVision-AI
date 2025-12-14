const InterviewQuestion = require('../models/InterviewQuestion');
const CreditLog = require('../models/CreditLog');
const User = require('../models/User');

// Upload a question
exports.uploadQuestion = async (req, res, next) => {
  try {
    const { company, role, question, difficulty, tags } = req.body;

    if (!company || !role || !question) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const exists = await InterviewQuestion.findOne({
      company,
      role,
      question: { $regex: question, $options: 'i' }
    });

    if (exists) {
      return res.status(409).json({ message: 'Question likely already exists' });
    }

    const q = await InterviewQuestion.create({
      company,
      role,
      question,
      difficulty,
      tags: tags || [],
      addedBy: req.user._id
    });

    const creditValue = 10;
    await CreditLog.create({
      user: req.user._id,
      source: 'uploaded_question',
      value: creditValue,
      meta: { questionId: q._id }
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { credits: creditValue }
    });

    res.status(201).json(q);
  } catch (err) {
    next(err);
  }
};

// Get questions
exports.getByCompanyRole = async (req, res, next) => {
  try {
    const { company, role, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (company) filter.company = company;
    if (role) filter.role = role;

    const questions = await InterviewQuestion.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ upvotes: -1, createdAt: -1 });

    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

// Upvote
exports.upvote = async (req, res, next) => {
  try {
    const q = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (q && q.addedBy) {
      const creditValue = 3;

      await CreditLog.create({
        user: q.addedBy,
        source: 'upvote_received',
        value: creditValue,
        meta: { questionId: q._id }
      });

      await User.findByIdAndUpdate(q.addedBy, {
        $inc: { credits: creditValue }
      });
    }

    res.json(q);
  } catch (err) {
    next(err);
  }
};
