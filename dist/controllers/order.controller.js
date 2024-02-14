import { createOrder, getAllCompletedOrdersByUserId, getAllProcessingOrdersByUserId, getOrderDetails, updateStatus, findAllProcessingOrdersByRestaurantId, } from "../models/order/query.js";
import { createScheduleOrder } from "../models/scheduleOrder/query.js";
import { prepareForSkeleton, sendToSkeleton, } from "../service/order.service.js";
export const createOrderController = async (req, res) => {
    try {
        const orderData = req.body;
        orderData.userId = req.body.user.id;
        const createdOrder = await createOrder(orderData);
        const detailedOrder = await prepareForSkeleton(createdOrder);
        const skeletonResponse = await sendToSkeleton(detailedOrder);
        res.status(201).json("order Posted");
        // res.status(201).json(createdOrder);
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
//# sourceMappingURL=order.controller.js.map