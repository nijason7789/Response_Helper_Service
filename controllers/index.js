import  getOpenAIResponse  from '../services/openaiService.js';
import { commentSuggest, moreComments, advice } from '../prompts/index.js';
import retryRequest from '../tools/retryRequest.js';

export const openaiController = async (req, res, next) => {
  try {
    const { originalComment } = req.body;
    const prompt = commentSuggest(originalComment);
    const response = await retryRequest(getOpenAIResponse, [prompt], 3);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const moreCommentsController = async (req, res, next) => {
  try {
    const needMoreComments = req.body;
    const prompt = moreComments(JSON.stringify(needMoreComments));
    const response = await retryRequest(getOpenAIResponse, [prompt], 3);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const wakeupController = async (req, res, next) => {
  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  try {
    console.log(`收到來自 IP: ${clientIp} 的喚醒信號`);
    res.json({ message: '服務正在喚醒' });
  } catch (error) {
    next(error);
  }
};

export const adviceController = async (req, res, next) => {
  try {
    const { fromLanguage, nativeComment, toLanguage, translatedComment } = req.body;
    const prompt = advice(fromLanguage, nativeComment, toLanguage, translatedComment);
    const response = await retryRequest(getOpenAIResponse, [prompt], 3);
    res.json(response);
  } catch (error) {
    next(error);
  }
};