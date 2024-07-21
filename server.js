import express from 'express'
import commentSuggest from './prompts/commentSuggests.js'
import moreComments from './prompts/moreComments.js'
import getOpenAIResponse from './services/openaiService.js';

const app = express();
const port = 3000;

app.use(express.json());


app.post('/api/openai', async (req, res) => {
    console.log(`request recieved, request.body = ${req.body}`)
  try {
    const { originalComment } = req.body;
    const prompt = commentSuggest(originalComment);
    console.log(`recieved, prompt = ${prompt}`)
    // const response = `recieved, prompt = ${prompt}`
    const response = await getOpenAIResponse(prompt);
    console.log(`response = ${response}`);
    res.json(response);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

app.post('/api/moreComments', async (req, res) => {
    try {
      const { previousRecommendation } = req.body;
      const prompt = moreComments(previousRecommendation);
      const response = await getOpenAIResponse(prompt);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
