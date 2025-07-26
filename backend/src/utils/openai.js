const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getOpenAISuggestion = async (campaign) => {
  try {
    const prompt = `
      Suggest the best target audience and budget for a digital ad campaign with
      objective: ${campaign.objective}, name: ${campaign.name}, and initial budget: ${campaign.budget}.
      `;
    const res = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });
    return res.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching OpenAI suggestion:", error);
    throw new Error("Failed to fetch suggestion from OpenAI");
  }
};
