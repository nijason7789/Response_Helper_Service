import {express} from express
import commentSuggest from './prompts/commentSuggests.js'
import moreComments from './prompts/moreComments.js'

const app = express();
const port = 3000;

app.use(express.json());


app.post('/api/openai', async (req, res) => {
  try {
    const { originalComment } = req.body;
    const prompt = commentSuggest(originalComment);
    const response = await openaiService.getOpenAIResponse(prompt);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

app.post('/api/moreComments', async (req, res) => {
    try {
      const { previousRecommendation } = req.body;
      const prompt = moreComments(previousRecommendation);
      const response = await openaiService.getOpenAIResponse(prompt);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
