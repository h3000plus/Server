import express from 'express';
import { createOrderController, createScheduleOrderController } from '../controllers/order.controller.js';
import protectMiddleware from '../middlewares/protect.middleware.js';

const router = express.Router();

// order
router.post('/order', protectMiddleware, createOrderController);
router.get('/orders/completed/:user-id');
router.get('/orders/processing/:user-id');
router.get('/order-status/:order-id');


// schedule order
router.post('/schedule-order', protectMiddleware, createScheduleOrderController);


export default router;