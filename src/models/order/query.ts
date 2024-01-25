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

// export const getNextSequenceValue = async function (sequenceName: any) {
//   const sequenceDoc = await CounterOrderModel.findOneAndUpdate(
//     { _id: sequenceName },
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   );
//   return sequenceDoc.sequence_value;
// };