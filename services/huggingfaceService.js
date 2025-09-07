// services/groqService.js
const axios = require("axios");

async function getPrediction(symptoms) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // or "llama3-8b-8192" for cheaper
        messages: [
          {
            role: "system",
            content: "You are a helpful medical assistant. Based only on symptoms, suggest possible health conditions. Keep it short and factual."
          },
          {
            role: "user",
            content: `Patient symptoms: ${symptoms}. What are the possible conditions?`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000 // 60 seconds, safe for large responses
      }
    );

    // Extract the AI's text reply
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    return "AI service unavailable. Please try again later.";
  }
}

module.exports = { getPrediction };
