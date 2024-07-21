import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

const getOpenAIResponse = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  return completion.choices[0];
};

export { getOpenAIResponse };
