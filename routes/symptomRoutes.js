const express = require("express");
const { getPrediction } = require("../services/huggingfaceService");
const History = require("../models/History");
const router = express.Router();

// Analyze form
router.get("/analyze", (req, res) => {
  res.render("analyze");
});

// Analyze submit
router.post("/analyze", async (req, res) => {
  const { symptoms } = req.body;
  let prediction = await getPrediction(symptoms);

  // ✅ Clean + format prediction into a list
  const predictionList = prediction
    .split("\n")
    .filter(line => line.trim() && !line.toLowerCase().includes("note:")) // remove empty & note
    .map((line, index) => `${index + 1}. ${line.replace(/^\*+/, "").trim()}`); // remove * and add numbering

  // ✅ Save to DB
  const history = new History({
    symptoms,
    prediction: predictionList.join("\n")
  });
  await history.save();

  console.log("Symptoms:", symptoms);
  console.log("Prediction (formatted):", predictionList);

  // ✅ Render result in frontend
  res.render("result", { symptoms, predictionList });
});


// Show all history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.render("history", { history });
  } catch (err) {
    console.error(err);
    res.render("history", { history: [], error: "Could not load history" });
  }
});

module.exports = router;
