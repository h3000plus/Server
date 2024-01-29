// import CounterOrderModel from './counterOrderModel.js';
import { IOrder } from '../../interfaces/order.interface.js';
import orderModel from './model.js';
// import OrderModel from './model.js';

// export const createOrderQuery = async (orderData: any) => {
//   try {
//     return await OrderModel.create(orderData);
//   } catch (error) {
//     console.log(error);
//     throw new Error('Error creating order');
//   }
// };

export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  try {
    const createdOrder = await orderModel.create(orderData);

    return createdOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Internal Server Error');
  }
};

// getting all orders by user id
export const getAllCompletedOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  try {
    // Assuming your OrderModel has a field named 'userId' to store the user ID
    const orders = await orderModel.find({ userId , orderStatus : 'completed'}).exec();
    return orders;
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw new Error('Internal Server Error');
  }
};

export const getAllProcessingOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  try {
    // Assuming your OrderModel has a field named 'userId' to store the user ID
    const orders = await orderModel.find({ userId , orderStatus : {$ne:"completed"}}).exec();
    return orders;
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw new Error('Internal Server Error');
  }
};