// src/services/aiService.js
// This file should be extended to call OpenAI or your chosen LLM.
module.exports = {
  evaluateAnswer: async ({ question, answer, role, company }) => {
    // Placeholder: in production call OpenAI with a prompt to evaluate answer.
    // For now return a mock score + feedback.
    const len = (answer || '').length;
    const score = Math.min(100, Math.round(Math.min(50 + len / 5, 100)));
    return {
      score,
      feedback: `Answer length suggests detail; aim to include STAR format examples and measure impact. (mock feedback).`,
      strengths: ['Good structure (mock)'],
      weaknesses: ['Add metrics and concise conclusion (mock)']
    };
  }
};
