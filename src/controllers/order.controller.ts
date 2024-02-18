import { Request, Response } from "express";
import {
  createOrder,
  getAllCompletedOrdersByUserId,
  getAllProcessingOrdersByUserId,
  getOrderDetails,
  updateStatus,
  findAllProcessingOrdersByRestaurantId,
} from "../models/order/query.js";
import { createScheduleOrder } from "../models/scheduleOrder/query.js";
import {

  prepareForRider,
  prepareForSkeleton,
  sendToSkeleton,
} from "../service/order.service.js";
import { updateTastyTagsScoreInDB } from "../models/user/query.js";

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderData = req.body;
    orderData.userId = req.body.user.id;

    const createdOrder = await createOrder(orderData);

    const detailedOrder = await prepareForSkeleton(createdOrder);

    // updating tasty tags score in customer model
    const updateTastyTagScoreInDB = await updateTastyTagsScoreInDB(detailedOrder.items, req.body.user.id)


    // const skeletonResponse = await sendToSkeleton(detailedOrder);
    const riderOrder = await prepareForRider(detailedOrder, orderData.userId);
    console.log(riderOrder);
    const skeletonResponse = await sendToSkeleton(detailedOrder);

    res.status(201).json("order Posted");
    // res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createScheduleOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderData = req.body;
    orderData.userId = req.body.user.id;

    const createdOrder = await createScheduleOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCompletedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const userId = req.params.userId;
    const userId = req.body.user.id;
    // req.headers[user-id]

    if (!userId) {
      res.status(400).json({ error: "User ID is required." });
      return;
    }

    const orders = await getAllCompletedOrdersByUserId(userId);

    res.json(orders);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProcessingOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const userId = req.params.userId;
    const userId = req.body.user.id;

    // req.headers[user-id]

    if (!userId) {
      res.status(400).json({ error: "User ID is required." });
      return;
    }

    const orders = await getAllProcessingOrdersByUserId(userId);

    res.json(orders);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId } = req.params;
  try {
    const orderDetails = await getOrderDetails(orderId);

    if (!orderDetails) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error in getOrderByIdController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId, status } = req.body;

  try {
    const changedOrder = await updateStatus(orderId, status);

    res.json({
      changedOrder,
    });
  } catch (error) {
    console.error("Error in change Order Status:", error);
    res.status(500).json({ error: error });
  }
};

export const getAllProcessingOrdersByRestaurantId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { restaurantId } = req.params;

  try {
    const orders = await findAllProcessingOrdersByRestaurantId(restaurantId);
    res.json({
      orders,
    });
  } catch (error) {
    console.error("Error fetching processing orders:", error);
    res.status(500).json({ error: error });
  }
};
