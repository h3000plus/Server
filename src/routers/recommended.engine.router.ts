import express from 'express';
import protectMiddleware from '../middlewares/protect.middleware.js';
import { getRecommendedRestaurantsController } from '../controllers/recommended.controller.js';

const router = express.Router();

router.get('/recommended-engine', protectMiddleware, getRecommendedRestaurantsController);

export default router;