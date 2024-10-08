import express from 'express'
import cors from 'cors'
import commentSuggest from './prompts/commentSuggests.js'
import moreComments from './prompts/moreComments.js'
import getOpenAIResponse from './services/openaiService.js';
import advice from './prompts/editor.js';
import retryRequest from './tools/retryRequest.js';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());


app.post('/api/openai', async (req, res) => {
    console.log(`request recieved, request.body = ${req.body}`)
  try {
    const { originalComment } = req.body;
    const prompt = commentSuggest(originalComment);
    console.log(`recieved, prompt = ${prompt}`)
    const response = await retryRequest(getOpenAIResponse, [prompt], 3);
    console.log(`response = ${JSON.stringify(response)}`);
    res.json(response);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

app.post('/api/moreComments', async (req, res) => {
    try {
      const needMoreComments = req.body;
      const prompt = moreComments(JSON.stringify(needMoreComments));
      console.log(`recieved, prompt = ${prompt}`)
      const response = await retryRequest(getOpenAIResponse,[prompt], 3);
      console.log(`response = ${JSON.stringify(response)}`);
      res.json(response);
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  });

app.get('/api/wakeup', async (req, res) =>{
  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  try{
    console.log(`Wake up signal received from IP: ${clientIp}`);
    res.json({ message: 'Service is waking up' })
  } catch (error){
    console.error(`Error processing wakeup request from IP: ${clientIp}`, error);
    res.status(500).send('Error processing request');
  }
})

app.post('/api/advice', async (req, res) =>{
  try {
    const {fromLanguage, nativeComment, toLanguage, translatedComment} = req.body;
    const prompt = advice(fromLanguage, nativeComment, toLanguage, translatedComment);
    console.log(`recieved, prompt = ${prompt}`)
    const response = await retryRequest(getOpenAIResponse,[prompt], 3);
    console.log(`response = ${JSON.stringify(response)}`);
    res.json(response);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


/*

mocked API format: 
{
  "originalComment":"",
  "Suggestion_1":"",
  "Suggestion_2":"",
  "Suggestion_3":""
}

*/
