const mongoose = require("mongoose");

const CreditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    source: { type: String, required: true }, // e.g., 'uploaded_question'
    value: { type: Number, required: true },
    meta: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.CreditLog ||
  mongoose.model("CreditLog", CreditLogSchema);
