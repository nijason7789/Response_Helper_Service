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
  console.log(completion.choices[0])
  const rawResponseData = completion.choices[0].message.content
  console.log(rawResponseData)
  let jsonResponseData;
  try{
        jsonResponseData = JSON.parse(rawResponseData);
    } catch (error) {
        console.error('Error parsing JSON response:', error);
        throw new Error('Invalid JSON response from OpenAI API');
  }
  return jsonResponseData;
};

export default getOpenAIResponse ;
