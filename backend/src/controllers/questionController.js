// const InterviewQuestion = require('../models/InterviewQuestion');
// const CreditLog = require('../models/CreditLog');
// const User = require('../models/User');

// // Upload a question
// exports.uploadQuestion = async (req, res, next) => {
//   try {
//     const { company, role, question, difficulty, tags } = req.body;

//     if (!company || !role || !question) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     const exists = await InterviewQuestion.findOne({
//       company,
//       role,
//       question: { $regex: question, $options: 'i' }
//     });

//     if (exists) {
//       return res.status(409).json({ message: 'Question likely already exists' });
//     }

//     const q = await InterviewQuestion.create({
//       company,
//       role,
//       question,
//       difficulty,
//       tags: tags || [],
//       addedBy: req.user._id
//     });

//     const creditValue = 10;
//     await CreditLog.create({
//       user: req.user._id,
//       source: 'uploaded_question',
//       value: creditValue,
//       meta: { questionId: q._id }
//     });

//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { credits: creditValue }
//     });

//     res.status(201).json(q);
//   } catch (err) {
//     next(err);
//   }
// };

// // Get questions
// exports.getByCompanyRole = async (req, res, next) => {
//   try {
//     const { company, role, page = 1, limit = 20 } = req.query;

//     const filter = {};
//     if (company) filter.company = company;
//     if (role) filter.role = role;

//     const questions = await InterviewQuestion.find(filter)
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .sort({ upvotes: -1, createdAt: -1 });

//     res.json({ questions });
//   } catch (err) {
//     next(err);
//   }
// };

// // Upvote
// exports.upvote = async (req, res, next) => {
//   try {
//     const q = await InterviewQuestion.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { upvotes: 1 } },
//       { new: true }
//     );

//     if (q && q.addedBy) {
//       const creditValue = 3;

//       await CreditLog.create({
//         user: q.addedBy,
//         source: 'upvote_received',
//         value: creditValue,
//         meta: { questionId: q._id }
//       });

//       await User.findByIdAndUpdate(q.addedBy, {
//         $inc: { credits: creditValue }
//       });
//     }

//     res.json(q);
//   } catch (err) {
//     next(err);
//   }
// };


const InterviewQuestion = require("../models/InterviewQuestion");
const CreditLog = require("../models/CreditLog");
const User = require("../models/User");

/* =====================================================
   UPLOAD A QUESTION (AUTH REQUIRED)
===================================================== */
exports.uploadQuestion = async (req, res, next) => {
  try {
    const { company, role, type, question, difficulty, tags } = req.body;

    if (!company || !role || !type || !question) {
      return res.status(400).json({
        message: "Company, role, type and question are required",
      });
    }

    // 🔥 DUPLICATE CHECK (company + role + type + question)
    const exists = await InterviewQuestion.findOne({
      company: new RegExp(`^${company}$`, "i"),
      role: new RegExp(`^${role}$`, "i"),
      type,
      question: { $regex: `^${question}$`, $options: "i" },
    });

    if (exists) {
      return res.status(409).json({ message: "Question already exists" });
    }

    // ✅ CREATE QUESTION
    const q = await InterviewQuestion.create({
      company,
      role,
      type, // 🔥 category folder
      question,
      difficulty: difficulty || "Medium",
      tags: tags || [],
      addedBy: req.user._id,
    });

    // 🎁 CREDIT REWARD
    const creditValue = 10;

    await CreditLog.create({
      user: req.user._id,
      source: "uploaded_question",
      value: creditValue,
      meta: { questionId: q._id },
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { credits: creditValue },
    });

    res.status(201).json(q);
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   GET QUESTIONS (PUBLIC)
   Used for:
   /company/:company/:type
===================================================== */
exports.getByCompanyRole = async (req, res, next) => {
  try {
    const { company, role, type } = req.query;

    const filter = {};

    if (company) filter.company = new RegExp(`^${company}$`, "i");
    if (role) filter.role = new RegExp(`^${role}$`, "i");
    if (type) filter.type = type; // 🔥 CRITICAL FIX

    const questions = await InterviewQuestion.find(filter).sort({
      createdAt: -1,
    });

    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   UPVOTE QUESTION (AUTH REQUIRED)
===================================================== */
exports.upvote = async (req, res, next) => {
  try {
    const q = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!q) {
      return res.status(404).json({ message: "Question not found" });
    }

    // 🎁 CREDIT TO OWNER
    if (q.addedBy) {
      const creditValue = 3;

      await CreditLog.create({
        user: q.addedBy,
        source: "upvote_received",
        value: creditValue,
        meta: { questionId: q._id },
      });

      await User.findByIdAndUpdate(q.addedBy, {
        $inc: { credits: creditValue },
      });
    }

    res.json(q);
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   GET DISTINCT COMPANY LIST (PUBLIC)
   Used on /questions page
===================================================== */
exports.getCompanies = async (req, res) => {
  try {
    const companies = await InterviewQuestion.distinct("company");
    res.json({ companies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};

/* =====================================================
   GET SINGLE QUESTION (DETAIL VIEW)
===================================================== */
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id).populate(
      "addedBy",
      "name"
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   GET AVAILABLE TYPES FOR A COMPANY (AUTO FOLDERS)
===================================================== */
exports.getCompanyTypes = async (req, res, next) => {
  try {
    const { company } = req.params;

    const types = await InterviewQuestion.distinct("type", {
      company: new RegExp(`^${company}$`, "i"),
    });

    res.json({ types });
  } catch (err) {
    next(err);
  }
};


// GET TYPES WITH COUNTS
exports.getCompanyTypesWithCount = async (req, res, next) => {
  try {
    const { company } = req.params;

    const result = await InterviewQuestion.aggregate([
      {
        $match: {
          company: { $regex: new RegExp(`^${company}$`, "i") }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1
        }
      }
    ]);

    res.json({ folders: result });
  } catch (err) {
    next(err);
  }
};
