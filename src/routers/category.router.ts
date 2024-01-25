import express from 'express'
import { getCuisinesController } from '../controllers/restaurant.controller.js';
const router = express.Router();

// restaurant
router.get('/all-cuisines', getCuisinesController)
router.get('/restaurant-cuisines/delivery');
router.get('/restaurant-cuisines/pickup');

// item
router.get('/item-categories/:restaurant_id')

export default router;