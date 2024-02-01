import { Request, Response } from "express";
import { createOrder, getAllCompletedOrdersByUserId, getAllProcessingOrdersByUserId, getOrderDetails } from "../models/order/query.js";
import { createScheduleOrder } from "../models/scheduleOrder/query.js";
import {
  prepareForSkeleton,
  sendToSkeleton,
} from "../service/order.service.js";
// import { createOrderQuery } from '../models/order/query.js';

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const order = await createOrderQuery(req.body);
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderData = req.body;
    orderData.userId = req.body.user.id;
    
    const createdOrder = await createOrder(orderData);
    
    const detailedOrder = await prepareForSkeleton(createdOrder);
    
    const skeletonResponse = await sendToSkeleton(detailedOrder);
    // res.status(201).json(createdOrder);
    res.status(201).json(skeletonResponse);
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
    console.log(orderData);
    const createdOrder = await createScheduleOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllCompletedOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    
    // const userId = req.params.userId;
    const userId = req.body.user.id;
    // req.headers[user-id]

    if (!userId) {
      res.status(400).json({ error: 'User ID is required.' });
      return;
    }

    const orders = await getAllCompletedOrdersByUserId(userId);

    res.json(orders);
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllProcessingOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    
    // const userId = req.params.userId;
    const userId = req.body.user.id;
    
    // req.headers[user-id]

    if (!userId) {
      res.status(400).json({ error: 'User ID is required.' });
      return;
    }

    const orders = await getAllProcessingOrdersByUserId(userId);

    res.json(orders);
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;

  try {
    const orderDetails = await getOrderDetails(orderId);

    if (!orderDetails) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error in getOrderByIdController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
