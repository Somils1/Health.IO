const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // link to user (optional for now)
  symptoms: { type: String, required: true },
  prediction: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("History", historySchema);
