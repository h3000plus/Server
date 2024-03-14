import express from 'express';
import { getCuisinesController } from '../controllers/restaurant.controller.js';
const router = express.Router();
// restaurant
router.get('/all-cuisines', getCuisinesController);
export default router;
//# sourceMappingURL=category.router.js.map