import { Request, Response } from 'express';
import { createOrder } from '../models/order/query.js';
import { createScheduleOrder } from '../models/scheduleOrder/query.js';
// import { createOrderQuery } from '../models/order/query.js';

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const order = await createOrderQuery(req.body);
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    orderData.userId = req.body.user.id
    const createdOrder = await createOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const createScheduleOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    orderData.userId = req.body.user.id;
    console.log(orderData)
    const createdOrder = await createScheduleOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};