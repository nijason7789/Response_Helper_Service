import express from 'express';
import { openaiController, moreCommentsController, wakeupController, adviceController } from '../controllers/index.js';

const router = express.Router();

router.post('/openai', openaiController);
router.post('/moreComments', moreCommentsController);
router.get('/wakeup', wakeupController);
router.post('/advice', adviceController);

export default router;