import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { errorHandler, requestLogger } from './middleware/index.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
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
