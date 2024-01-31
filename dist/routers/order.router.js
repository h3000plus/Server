import express from 'express';
import { createOrderController, createScheduleOrderController, getAllCompletedOrders, getAllProcessingOrders, getOrderByIdController } from '../controllers/order.controller.js';
import protectMiddleware from '../middlewares/protect.middleware.js';
const router = express.Router();
// order
router.post('/order', protectMiddleware, createOrderController);
router.get('/orders/completed', protectMiddleware, getAllCompletedOrders);
router.get('/orders/processing', protectMiddleware, getAllProcessingOrders);
router.get('/order-status/:order-id');
router.get('/order-details/:orderId', getOrderByIdController);
// schedule order
router.post('/schedule-order', protectMiddleware, createScheduleOrderController);
export default router;
//# sourceMappingURL=order.router.js.map