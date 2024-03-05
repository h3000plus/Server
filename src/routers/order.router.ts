import express from "express";
import {
  createOrderController,
  createScheduleOrderController,
  getAllCompletedOrders,
  getAllProcessingOrders,
  getOrderByIdController,
  changeOrderStatus,
  getAllProcessingOrdersByRestaurantId,
  assignRider,
  updateOrderStatusByOrderId,
  getOrderUserId,
} from "../controllers/order.controller.js";
import protectMiddleware from "../middlewares/protect.middleware.js";

const router = express.Router();

// order
router.post("/order", protectMiddleware, createOrderController);
router.get("/orders/completed", protectMiddleware, getAllCompletedOrders);
router.get("/orders/processing", protectMiddleware, getAllProcessingOrders);
router.get(
  "/orders/processing/:restaurantId",
  getAllProcessingOrdersByRestaurantId
);
router.get("/order-user-id", protectMiddleware, getOrderUserId);
router.put("/order-status/:orderId", updateOrderStatusByOrderId);
router.get("/order-details/:orderId", getOrderByIdController);
router.post("/change-order-status", changeOrderStatus);
router.put("/assign-rider", assignRider);

// schedule order
router.post(
  "/schedule-order",
  protectMiddleware,
  createScheduleOrderController
);

export default router;
