// const InterviewQuestion = require("../models/InterviewQuestion");
// const CreditLog = require("../models/CreditLog");
// const User = require("../models/User");
// const OpenAI = require("openai");

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /* =====================================================
//    UPLOAD QUESTION (AUTH)
// ===================================================== */
// exports.uploadQuestion = async (req, res, next) => {
//   try {
//     const { company, role, type, question, difficulty, tags } = req.body;

//     if (!company || !role || !type || !question) {
//       return res.status(400).json({
//         message: "Company, role, type and question are required",
//       });
//     }

//     const exists = await InterviewQuestion.findOne({
//       company: new RegExp(`^${company}$`, "i"),
//       role: new RegExp(`^${role}$`, "i"),
//       type: new RegExp(`^${type}$`, "i"),
//       question: { $regex: `^${question}$`, $options: "i" },
//     });

//     if (exists) {
//       return res.status(409).json({ message: "Question already exists" });
//     }

//     const q = await InterviewQuestion.create({
//       company,
//       role,
//       type,
//       question,
//       difficulty: difficulty || "Medium",
//       tags: tags || [],
//       addedBy: req.user._id,
//     });

//     // 🎁 Credit reward
//     const creditValue = 10;
//     await CreditLog.create({
//       user: req.user._id,
//       source: "uploaded_question",
//       value: creditValue,
//       meta: { questionId: q._id },
//     });

//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { credits: creditValue },
//     });

//     res.status(201).json(q);
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    GET QUESTIONS (SEARCH + PAGINATION)
// ===================================================== */
// exports.getQuestions = async (req, res, next) => {
//   try {
//     const {
//       company,
//       type,
//       role,
//       difficulty,
//       search,
//       page = 1,
//       limit = 10,
//       sort = "newest",
//     } = req.query;

//     const filter = {};

//     if (company) filter.company = new RegExp(`^${company}$`, "i");
//     if (type) filter.type = new RegExp(`^${type}$`, "i");
//     if (role) filter.role = new RegExp(role, "i");
//     if (difficulty) filter.difficulty = difficulty;
//     if (search) filter.question = { $regex: search, $options: "i" };

//     let sortQuery = { createdAt: -1 };
//     if (sort === "upvotes") sortQuery = { upvotes: -1 };

//     const skip = (page - 1) * limit;

//     const [questions, total] = await Promise.all([
//       InterviewQuestion.find(filter)
//         .sort(sortQuery)
//         .skip(skip)
//         .limit(Number(limit)),
//       InterviewQuestion.countDocuments(filter),
//     ]);

//     res.json({
//       questions,
//       page: Number(page),
//       totalPages: Math.ceil(total / limit),
//       total,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    UPVOTE QUESTION
// ===================================================== */
// exports.upvote = async (req, res, next) => {
//   try {
//     const q = await InterviewQuestion.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { upvotes: 1 } },
//       { new: true }
//     );

//     if (!q) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     if (q.addedBy) {
//       const creditValue = 3;
//       await CreditLog.create({
//         user: q.addedBy,
//         source: "upvote_received",
//         value: creditValue,
//         meta: { questionId: q._id },
//       });

//       await User.findByIdAndUpdate(q.addedBy, {
//         $inc: { credits: creditValue },
//       });
//     }

//     res.json(q);
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    GET COMPANIES
// ===================================================== */
// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await InterviewQuestion.distinct("company");
//     res.json({ companies });
//   } catch {
//     res.status(500).json({ message: "Failed to fetch companies" });
//   }
// };

// /* =====================================================
//    GET COMPANY TYPES
// ===================================================== */
// exports.getCompanyTypes = async (req, res, next) => {
//   try {
//     const { company } = req.params;
//     const types = await InterviewQuestion.distinct("type", {
//       company: new RegExp(`^${company}$`, "i"),
//     });
//     res.json({ types });
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    GET TYPES WITH COUNTS (FOLDERS)
// ===================================================== */
// exports.getCompanyTypesWithCount = async (req, res, next) => {
//   try {
//     const { company } = req.params;

//     const folders = await InterviewQuestion.aggregate([
//       {
//         $match: {
//           company: { $regex: new RegExp(`^${company}$`, "i") },
//         },
//       },
//       {
//         $group: {
//           _id: "$type",
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           type: "$_id",
//           count: 1,
//         },
//       },
//     ]);

//     res.json({ folders });
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    GET SINGLE QUESTION
// ===================================================== */
// exports.getQuestionById = async (req, res, next) => {
//   try {
//     const question = await InterviewQuestion.findById(req.params.id).populate(
//       "addedBy",
//       "name"
//     );

//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     res.json(question);
//   } catch (err) {
//     next(err);
//   }
// };

// /* =====================================================
//    AI ANSWER (CACHED + CREDIT SAFE)
// ===================================================== */
// exports.getAIAnswer = async (req, res, next) => {
//   try {
//     const question = await InterviewQuestion.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     // ✅ Cached answer
//     if (question.aiAnswer) {
//       return res.json({ answer: question.aiAnswer, cached: true });
//     }

//     const user = await User.findById(req.user._id);
//     const CREDIT_COST = 5;

//     if (user.credits < CREDIT_COST) {
//       return res.status(403).json({ message: "Not enough credits" });
//     }

//     const prompt = `
// You are an expert interview coach.

// Question Type: ${question.type}
// Difficulty: ${question.difficulty}
// Question: ${question.question}

// Give:
// 1. Clear explanation
// 2. What interviewer expects
// 3. Sample answer if applicable
// `;

//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.4,
//     });

//     const aiAnswer = completion.choices[0].message.content;

//     question.aiAnswer = aiAnswer;
//     await question.save();

//     // 💳 Deduct credits
//     user.credits -= CREDIT_COST;
//     await user.save();

//     await CreditLog.create({
//       user: user._id,
//       source: "ai_answer",
//       value: -CREDIT_COST,
//       meta: { questionId: question._id },
//     });

//     res.json({ answer: aiAnswer, cached: false });
//   } catch (err) {
//     next(err);
//   }
// };


// exports.getAIAnswer = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user || user.credits < 5) {
//       return res.status(403).json({
//         message: "Insufficient credits to generate AI answer"
//       });
//     }

//     const question = await InterviewQuestion.findById(req.params.id);

//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     // ✅ Return cached answer (NO CREDIT DEDUCTION)
//     if (question.aiAnswer) {
//       return res.json({
//         answer: question.aiAnswer,
//         cached: true
//       });
//     }

//     const prompt = `
// You are an expert technical interviewer.

// Question Type: ${question.type}
// Difficulty: ${question.difficulty}
// Question: ${question.question}

// Provide:
// 1. Clear explanation
// 2. Key points interviewer expects
// 3. Sample answer (if applicable)
// `;

//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.4
//     });

//     const aiAnswer = completion.choices[0].message.content;

//     // 💾 Save answer
//     question.aiAnswer = aiAnswer;
//     await question.save();

//     // 🔥 DEDUCT CREDITS (ONLY ON NEW GENERATION)
//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { credits: -5 }
//     });

//     res.json({
//       answer: aiAnswer,
//       cached: false
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const InterviewQuestion = require("../models/InterviewQuestion");
// const CreditLog = require("../models/CreditLog");
// const User = require("../models/User");
// const axios = require("axios");

// /* ================= HUGGING FACE CONFIG ================= */
// const HF_API_URL =
//   "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

// const hfClient = axios.create({
//   headers: {
//     Authorization: `Bearer ${process.env.HF_API_KEY}`, // ✅ FIXED
//     "Content-Type": "application/json",
//   },
// });

// /* ================= UPLOAD QUESTION (+5 CREDITS) ================= */
// const uploadQuestion = async (req, res, next) => {
//   try {
//     const { company, role, type, question, difficulty, tags } = req.body;

//     if (!company || !role || !type || !question) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const exists = await InterviewQuestion.findOne({
//       company: new RegExp(`^${company}$`, "i"),
//       role: new RegExp(`^${role}$`, "i"),
//       type: new RegExp(`^${type}$`, "i"),
//       question: new RegExp(`^${question}$`, "i"),
//     });

//     if (exists) {
//       return res.status(409).json({ message: "Question already exists" });
//     }

//     const q = await InterviewQuestion.create({
//       company,
//       role,
//       type,
//       question,
//       difficulty: difficulty || "Medium",
//       tags: tags || [],
//       addedBy: req.user._id, // ✅ ObjectId (CRITICAL FIX)
//     });

//     const CREDIT_REWARD = 5;

//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { credits: CREDIT_REWARD },
//     });

//     await CreditLog.create({
//       user: req.user._id,
//       source: "question_published",
//       value: CREDIT_REWARD,
//       meta: { questionId: q._id },
//     });

//     res.status(201).json({
//       message: "Question published",
//       creditsAdded: CREDIT_REWARD,
//       question: q,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /* ================= GET QUESTIONS ================= */
// const getQuestions = async (req, res, next) => {
//   try {
//     const { company, role, type, difficulty, search } = req.query;
//     const filter = {};

//     if (company) filter.company = new RegExp(company, "i");
//     if (role) filter.role = new RegExp(role, "i");
//     if (type) filter.type = new RegExp(type, "i");
//     if (difficulty) filter.difficulty = difficulty;
//     if (search) filter.question = new RegExp(search, "i");

//     const questions = await InterviewQuestion.find(filter)
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json({ questions });
//   } catch (err) {
//     next(err);
//   }
// };

// /* ================= UPVOTE QUESTION (+3 CREDITS) ================= */
// const upvote = async (req, res, next) => {
//   try {
//     const q = await InterviewQuestion.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { upvotes: 1 } },
//       { new: true }
//     );

//     if (!q) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     if (q.addedBy) {
//       await User.findByIdAndUpdate(q.addedBy, {
//         $inc: { credits: 3 },
//       });

//       await CreditLog.create({
//         user: q.addedBy,
//         source: "upvote_received",
//         value: 3,
//         meta: { questionId: q._id },
//       });
//     }

//     res.json(q);
//   } catch (err) {
//     next(err);
//   }
// };

// /* ================= GET COMPANIES ================= */
// const getCompanies = async (req, res) => {
//   const companies = await InterviewQuestion.distinct("company");
//   res.json({ companies });
// };

// /* ================= GET COMPANY TYPES ================= */
// const getCompanyTypes = async (req, res) => {
//   const types = await InterviewQuestion.distinct("type", {
//     company: new RegExp(req.params.company, "i"),
//   });
//   res.json({ types });
// };

// /* ================= GET TYPES WITH COUNTS ================= */
// const getCompanyTypesWithCount = async (req, res) => {
//   const folders = await InterviewQuestion.aggregate([
//     { $match: { company: new RegExp(req.params.company, "i") } },
//     { $group: { _id: "$type", count: { $sum: 1 } } },
//     { $project: { _id: 0, type: "$_id", count: 1 } },
//   ]);

//   res.json({ folders });
// };

// /* ================= GET SINGLE QUESTION ================= */
// const getQuestionById = async (req, res, next) => {
//   try {
//     const question = await InterviewQuestion.findById(req.params.id).populate(
//       "addedBy",
//       "name"
//     );

//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     res.json(question);
//   } catch (err) {
//     next(err);
//   }
// };

// /* ================= AI ANSWER (HF −5 CREDITS) ================= */
// const {
//   generateAIAnswer,
// } = require("../services/huggingfaceService");

// /* ================= AI ANSWER (HF −5 CREDITS) ================= */
// const getAIAnswer = async (req, res, next) => {
//   try {
//     const question = await InterviewQuestion.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     // ✅ CACHE
//     if (question.aiAnswer) {
//       return res.json({ answer: question.aiAnswer, cached: true });
//     }

//     const user = await User.findById(req.user._id);
//     if (!user || user.credits < 5) {
//       return res.status(403).json({ message: "Not enough credits" });
//     }

//     // ✅ HF SERVICE CALL (router.huggingface.co)
//     const aiAnswer = await generateAIAnswer(question.question);

//     question.aiAnswer = aiAnswer;
//     await question.save();

//     await User.findByIdAndUpdate(user._id, {
//       $inc: { credits: -5 },
//     });

//     await CreditLog.create({
//       user: user._id,
//       source: "ai_answer",
//       value: -5,
//       meta: { questionId: question._id },
//     });

//     res.json({ answer: aiAnswer, cached: false });
//   } catch (err) {
//     console.error("HF ERROR:", err.message);
//     next(err);
//   }
// };

// /* ================= EXPORTS ================= */
// module.exports = {
//   uploadQuestion,
//   getQuestions,
//   upvote,
//   getCompanies,
//   getCompanyTypes,
//   getCompanyTypesWithCount,
//   getQuestionById,
//   getAIAnswer,
// };

const InterviewQuestion = require("../models/InterviewQuestion");
const CreditLog = require("../models/CreditLog");
const User = require("../models/User");

/* ================= NORMALIZE HELPERS ================= */
const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* ================= UPLOAD QUESTION (+5 CREDITS) ================= */
const uploadQuestion = async (req, res, next) => {
  try {
    let { company, role, type, question, difficulty, tags } = req.body;

    if (!company || !role || !type || !question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ NORMALIZE (CRITICAL)
    company = normalizeText(company);
    role = role.trim();
    type = type.trim();
    question = question.trim();

    const exists = await InterviewQuestion.findOne({
      company,
      role: new RegExp(`^${role}$`, "i"),
      type: new RegExp(`^${type}$`, "i"),
      question: new RegExp(`^${question}$`, "i"),
    });

    if (exists) {
      return res.status(409).json({ message: "Question already exists" });
    }

    const newQuestion = await InterviewQuestion.create({
      company,
      role,
      type,
      question,
      difficulty: difficulty || "Medium",
      tags: tags || [],
      addedBy: req.user._id, // ✅ ObjectId
    });

    // ✅ CREDIT REWARD
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { credits: 5 },
    });

    await CreditLog.create({
      user: req.user._id,
      source: "question_published",
      value: 5,
      meta: { questionId: newQuestion._id },
    });

    res.status(201).json({
      message: "Question published",
      creditsAdded: 5,
      question: newQuestion,
    });
  } catch (err) {
    next(err);
  }
};

/* ================= GET QUESTIONS ================= */
const getQuestions = async (req, res, next) => {
  try {
    const { company, role, type, difficulty, search } = req.query;
    const filter = {};

    if (company) filter.company = new RegExp(`^${company}$`, "i");
    if (role) filter.role = new RegExp(role, "i");
    if (type) filter.type = new RegExp(type, "i");
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.question = new RegExp(search, "i");

    const questions = await InterviewQuestion.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ questions });
  } catch (err) {
    next(err);
  }
};

/* ================= UPVOTE QUESTION (+3 CREDITS) ================= */
const upvote = async (req, res, next) => {
  try {
    const q = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!q) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (q.addedBy) {
      await User.findByIdAndUpdate(q.addedBy, {
        $inc: { credits: 3 },
      });

      await CreditLog.create({
        user: q.addedBy,
        source: "upvote_received",
        value: 3,
        meta: { questionId: q._id },
      });
    }

    res.json(q);
  } catch (err) {
    next(err);
  }
};

/* ================= GET COMPANIES (DEDUPED) ================= */
const getCompanies = async (req, res) => {
  const companies = await InterviewQuestion.distinct("company");

  const normalized = [
    ...new Set(companies.map((c) => normalizeText(c))),
  ];

  res.json({ companies: normalized });
};

/* ================= GET COMPANY TYPES ================= */
const getCompanyTypes = async (req, res) => {
  const company = normalizeText(req.params.company);

  const types = await InterviewQuestion.distinct("type", {
    company,
  });

  res.json({ types });
};

/* ================= GET TYPES WITH COUNTS ================= */
const getCompanyTypesWithCount = async (req, res) => {
  const company = normalizeText(req.params.company);

  const folders = await InterviewQuestion.aggregate([
    { $match: { company } },
    { $group: { _id: "$type", count: { $sum: 1 } } },
    { $project: { _id: 0, type: "$_id", count: 1 } },
  ]);

  res.json({ folders });
};

/* ================= GET SINGLE QUESTION ================= */
const getQuestionById = async (req, res, next) => {
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

/* ================= AI ANSWER (HF SERVICE −5 CREDITS) ================= */
const { generateAIAnswer } = require("../services/huggingfaceService");

const getAIAnswer = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // ✅ CACHE
    if (question.aiAnswer) {
      return res.json({ answer: question.aiAnswer, cached: true });
    }

    const user = await User.findById(req.user._id);
    if (!user || user.credits < 5) {
      return res.status(403).json({ message: "Not enough credits" });
    }

    // ✅ HF ROUTER SERVICE
    const aiAnswer = await generateAIAnswer(question.question);

    question.aiAnswer = aiAnswer;
    await question.save();

    await User.findByIdAndUpdate(user._id, {
      $inc: { credits: -5 },
    });

    await CreditLog.create({
      user: user._id,
      source: "ai_answer",
      value: -5,
      meta: { questionId: question._id },
    });

    res.json({ answer: aiAnswer, cached: false });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    next(err);
  }
};

/* ================= EXPORTS ================= */
module.exports = {
  uploadQuestion,
  getQuestions,
  upvote,
  getCompanies,
  getCompanyTypes,
  getCompanyTypesWithCount,
  getQuestionById,
  getAIAnswer,
};
