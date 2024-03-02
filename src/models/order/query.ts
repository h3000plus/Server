// import CounterOrderModel from './counterOrderModel.js';
import { IOrder } from "../../interfaces/order.interface.js";
import orderModel from "./model.js";
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
    orderData.restaurantId = orderData.cartItems[0].resId;
    const createdOrder = await orderModel.create(orderData);
    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Internal Server Error");
  }
};

// getting order details by order id
export const getOrderDetails = async (
  orderId: string
): Promise<IOrder | null> => {
  try {
    const foundOrder = await orderModel.findById(orderId);
    return foundOrder;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

// getting all completed orders by user id
export const getAllCompletedOrdersByUserId = async (
  userId: string
): Promise<IOrder[]> => {
  try {
    // Assuming your OrderModel has a field named 'userId' to store the user ID
    const orders = await orderModel
      .find({ userId, orderStatus: "completed" })
      .exec();
    return orders;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Internal Server Error");
  }
};

// getting all processing orders by user id
export const getAllProcessingOrdersByUserId = async (
  userId: string
): Promise<IOrder[]> => {
  try {
    // Assuming your OrderModel has a field named 'userId' to store the user ID
    const orders = await orderModel
      .find({ userId, orderStatus: { $ne: "completed" } })
      .exec();
    return orders;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Internal Server Error");
  }
};

export const updateStatus = async (_id: string, orderStatus: string) => {
  try {
    const newOrder = await orderModel.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        orderStatus: orderStatus,
      },
      {
        new: true,
      }
    );
    return newOrder;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Internal Server Error");
  }
};

export const findAllProcessingOrdersByRestaurantId = async (
  restaurandId: string
): Promise<IOrder[]> => {
  try {
    const orders = await orderModel
      .find({ restaurantId: restaurandId})
      .exec();
    return orders;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Internal Server Error");
  }
};

export const updateRiderId = async (orderId: string, riderId: string) => {
  try {
    const newOrder = await orderModel.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        riderId: riderId,
      },
      {
        new: true,
      }
    );
    return newOrder;
  } catch (error) {
    console.error("Error assigning order", error);
    throw new Error("Internal Server Error");
  }
};
