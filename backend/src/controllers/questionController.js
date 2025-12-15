const InterviewQuestion = require("../models/InterviewQuestion");
const CreditLog = require("../models/CreditLog");
const User = require("../models/User");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =====================================================
   UPLOAD QUESTION (AUTH)
===================================================== */
exports.uploadQuestion = async (req, res, next) => {
  try {
    const { company, role, type, question, difficulty, tags } = req.body;

    if (!company || !role || !type || !question) {
      return res.status(400).json({
        message: "Company, role, type and question are required",
      });
    }

    const exists = await InterviewQuestion.findOne({
      company: new RegExp(`^${company}$`, "i"),
      role: new RegExp(`^${role}$`, "i"),
      type: new RegExp(`^${type}$`, "i"),
      question: { $regex: `^${question}$`, $options: "i" },
    });

    if (exists) {
      return res.status(409).json({ message: "Question already exists" });
    }

    const q = await InterviewQuestion.create({
      company,
      role,
      type,
      question,
      difficulty: difficulty || "Medium",
      tags: tags || [],
      addedBy: req.user._id,
    });

    // 🎁 Credit reward
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
   GET QUESTIONS (SEARCH + PAGINATION)
===================================================== */
exports.getQuestions = async (req, res, next) => {
  try {
    const {
      company,
      type,
      role,
      difficulty,
      search,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    const filter = {};

    if (company) filter.company = new RegExp(`^${company}$`, "i");
    if (type) filter.type = new RegExp(`^${type}$`, "i");
    if (role) filter.role = new RegExp(role, "i");
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.question = { $regex: search, $options: "i" };

    let sortQuery = { createdAt: -1 };
    if (sort === "upvotes") sortQuery = { upvotes: -1 };

    const skip = (page - 1) * limit;

    const [questions, total] = await Promise.all([
      InterviewQuestion.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(Number(limit)),
      InterviewQuestion.countDocuments(filter),
    ]);

    res.json({
      questions,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   UPVOTE QUESTION
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
   GET COMPANIES
===================================================== */
exports.getCompanies = async (req, res) => {
  try {
    const companies = await InterviewQuestion.distinct("company");
    res.json({ companies });
  } catch {
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};

/* =====================================================
   GET COMPANY TYPES
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

/* =====================================================
   GET TYPES WITH COUNTS (FOLDERS)
===================================================== */
exports.getCompanyTypesWithCount = async (req, res, next) => {
  try {
    const { company } = req.params;

    const folders = await InterviewQuestion.aggregate([
      {
        $match: {
          company: { $regex: new RegExp(`^${company}$`, "i") },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);

    res.json({ folders });
  } catch (err) {
    next(err);
  }
};

/* =====================================================
   GET SINGLE QUESTION
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
   AI ANSWER (CACHED + CREDIT SAFE)
===================================================== */
exports.getAIAnswer = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // ✅ Cached answer
    if (question.aiAnswer) {
      return res.json({ answer: question.aiAnswer, cached: true });
    }

    const user = await User.findById(req.user._id);
    const CREDIT_COST = 5;

    if (user.credits < CREDIT_COST) {
      return res.status(403).json({ message: "Not enough credits" });
    }

    const prompt = `
You are an expert interview coach.

Question Type: ${question.type}
Difficulty: ${question.difficulty}
Question: ${question.question}

Give:
1. Clear explanation
2. What interviewer expects
3. Sample answer if applicable
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const aiAnswer = completion.choices[0].message.content;

    question.aiAnswer = aiAnswer;
    await question.save();

    // 💳 Deduct credits
    user.credits -= CREDIT_COST;
    await user.save();

    await CreditLog.create({
      user: user._id,
      source: "ai_answer",
      value: -CREDIT_COST,
      meta: { questionId: question._id },
    });

    res.json({ answer: aiAnswer, cached: false });
  } catch (err) {
    next(err);
  }
};


exports.getAIAnswer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.credits < 5) {
      return res.status(403).json({
        message: "Insufficient credits to generate AI answer"
      });
    }

    const question = await InterviewQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // ✅ Return cached answer (NO CREDIT DEDUCTION)
    if (question.aiAnswer) {
      return res.json({
        answer: question.aiAnswer,
        cached: true
      });
    }

    const prompt = `
You are an expert technical interviewer.

Question Type: ${question.type}
Difficulty: ${question.difficulty}
Question: ${question.question}

Provide:
1. Clear explanation
2. Key points interviewer expects
3. Sample answer (if applicable)
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const aiAnswer = completion.choices[0].message.content;

    // 💾 Save answer
    question.aiAnswer = aiAnswer;
    await question.save();

    // 🔥 DEDUCT CREDITS (ONLY ON NEW GENERATION)
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { credits: -5 }
    });

    res.json({
      answer: aiAnswer,
      cached: false
    });
  } catch (err) {
    next(err);
  }
};
