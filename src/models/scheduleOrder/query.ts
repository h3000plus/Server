import { IScheduleOrder } from "../../interfaces/order.interface.js";
import scheduleOrderModel from "./model.js";



export const createScheduleOrder = async (orderData: IScheduleOrder): Promise<IScheduleOrder> => {
    try {
      const scheduleOrder = await scheduleOrderModel.create(orderData);

      return scheduleOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Internal Server Error');
    }
  };