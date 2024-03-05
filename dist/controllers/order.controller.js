import { createOrder, getAllCompletedOrdersByUserId, getAllProcessingOrdersByUserId, getOrderDetails, updateStatus, findAllProcessingOrdersByRestaurantId, updateRiderId, updateOrderStatus, } from "../models/order/query.js";
import { createScheduleOrder } from "../models/scheduleOrder/query.js";
import { prepareDataForInventory, prepareForKDS, prepareForRider, } from "../service/order.service.js";
import { sendOrderToKDS, sendToInventory, sendToRider } from "../service/orderMQ.service.js";
// import { io } from "../app.js";
// OLD AND UNTOUCHED
// export const createOrderController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const orderData = req.body;
//     orderData.userId = req.body.user.id;
//     const createdOrder = await createOrder(orderData);
//     const detailedOrder = await prepareForSkeleton(createdOrder);
//     const riderOrder = await prepareForRider(detailedOrder, orderData);
//     const riderResponse = await sendToRider(riderOrder);
//     const skeletonResponse = await sendToSkeleton(detailedOrder);
//     res.status(201).json("order Posted");
//     // res.status(201).json(createdOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// USING MQ
export const createOrderController = async (req, res) => {
    try {
        const orderData = req.body;
        orderData.userId = req.body.user.id;
        const createdOrder = await createOrder(orderData);
        const detailedOrder = await prepareForKDS(createdOrder);
        const dataForInventory = await prepareDataForInventory(detailedOrder);
        const riderOrder = await prepareForRider(detailedOrder, orderData);
        await sendToRider(riderOrder);
        await sendOrderToKDS(detailedOrder);
        await sendToInventory(dataForInventory);
        res.status(201).json("order Posted");
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const createScheduleOrderController = async (req, res) => {
    try {
        const orderData = req.body;
        orderData.userId = req.body.user.id;
        const createdOrder = await createScheduleOrder(orderData);
        res.status(201).json(createdOrder);
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getOrderUserId = async (req, res) => {
    try {
        res.json(req.body.user.id);
    }
    catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getAllCompletedOrders = async (req, res) => {
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
    }
    catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getAllProcessingOrders = async (req, res) => {
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
    }
    catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getOrderByIdController = async (req, res) => {
    const { orderId } = req.params;
    try {
        const orderDetails = await getOrderDetails(orderId);
        if (!orderDetails) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json(orderDetails);
    }
    catch (error) {
        console.error("Error in getOrderByIdController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const changeOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const changedOrder = await updateStatus(orderId, status);
        res.json({
            changedOrder,
        });
    }
    catch (error) {
        console.error("Error in change Order Status:", error);
        res.status(500).json({ error: error });
    }
};
export const getAllProcessingOrdersByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const orders = await findAllProcessingOrdersByRestaurantId(restaurantId);
        res.json({
            orders,
        });
    }
    catch (error) {
        console.error("Error fetching processing orders:", error);
        res.status(500).json({ error: error });
    }
};
export const assignRider = async (req, res) => {
    const { orderId, riderId } = req.body;
    try {
        const updatedOrder = await updateRiderId(orderId, riderId);
        res.json({
            updatedOrder,
        });
    }
    catch (error) {
        console.error("Error fetching processing orders:", error);
        res.status(500).json({ error: error });
    }
};
export const updateOrderStatusByOrderId = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    try {
        const updatedOrder = await updateOrderStatus(orderId, orderStatus);
        if (updatedOrder) {
            const io = res.locals.io;
            io.to(updatedOrder.userId).emit('order-status-change', updatedOrder);
            res.status(200).json(updatedOrder.orderStatus);
        }
        else {
            res.status(404).json({ success: false, error: 'Order not found' });
        }
    }
    catch (error) {
        console.error("Error fetching processing orders:", error);
        res.status(500).json({ error: error });
    }
};
//# sourceMappingURL=order.controller.js.map