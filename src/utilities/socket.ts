// import { Server } from 'http';
// import { Server as SocketIOServer, Socket } from 'socket.io';
// import { updateOrderStatus } from '../models/order/query.js';

// export default function initializeSocket(server: Server) {
//   const io: SocketIOServer = new SocketIOServer(server); 

//   io.on('connection', (socket: Socket) => { 
//     console.log('Client connected');

//     socket.on('updateOrderStatus', async (data: { orderId: string, orderStatus: string }) => {
//       const { orderId, orderStatus } = data;

//       try {
//         const updatedOrder = await updateOrderStatus(orderId, orderStatus);

//         if (updatedOrder) {
//           socket.emit('orderStatusUpdated', { success: true });
//           console.log('ok')
//         } else {
//           socket.emit('orderStatusUpdated', { success: false, error: 'Order not found' });
//         }
//       } catch (error) {
//         console.error('Error updating order status:', error);
//         socket.emit('orderStatusUpdated', { success: false,  error });
//       }
//     });
//   });
// }



// import socketIo from 'socket.io';
// import { Server } from 'http'; // Import Server from http module

// import Order from '../models/order/model.js'; // Assuming you have Order model defined

// function initializeSocket(server: Server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     socket.on('updateOrderStatus', async (data: { params: { orderId: string }, body: { orderStatus: string } }) => {
//       const { orderId } = data.params;
//       const { orderStatus } = data.body;

//       try {
//         // Update order status using Mongoose
//         const updatedOrder:  await orderModel.findOneAndUpdate(
//           { _id: orderId }, // Changed orderId to _id as per Mongoose's convention
//           { $set: { orderStatus: orderStatus } },
//           { new: true }
//         );

//         if (updatedOrder) {
//           // Emit success event back to the client if needed
//           socket.emit('orderStatusUpdated', { success: true });
//         } else {
//           throw new Error('Order not found');
//         }
//       } catch (error) {
//         console.error('Error updating order status:', error);
//         // Emit error event back to the client if needed
//         socket.emit('orderStatusUpdated', { success: false, error: error.message });
//       }
//     });
//   });
// }

// export default initializeSocket;




// import Order from '../models/order.js';

// // Controller function to update order status
// export const updateOrderStatus = async (req, res) => {
//   const { orderId } = req.params;
//   const { orderstatus } = req.body;

//   try {
//     // Update order status using Mongoose
//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: orderId },
//       { $set: { orderStatus: orderstatus } },
//       { new: true }
//     );

//     if (updatedOrder) {
//       // Emit success event back to the client if needed
//       res.status(200).json({ success: true });
//     } else {
//       res.status(404).json({ success: false, error: 'Order not found' });
//     }
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// import express from 'express';
// import { updateOrderStatus } from '../controllers/orderController.js';

// const router = express.Router();

// // Route for updating order status
// router.put('/:orderId', updateOrderStatus);

// export default router;


// import socketIo from 'socket.io';
// import Order from '../models/order.js';

// function initializeSocket(server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     socket.on('updateOrderStatus', async (data) => {
//       const { orderId } = data.params;
//       const { orderstatus } = data.body;

//       try {
//         // Update order status using Mongoose
//         const updatedOrder = await Order.findOneAndUpdate(
//           { orderId: orderId },
//           { $set: { orderStatus: orderstatus } },
//           { new: true }
//         );

//         if (updatedOrder) {
//           // Emit success event back to the client if needed
//           socket.emit('orderStatusUpdated', { success: true });
//         } else {
//           throw new Error('Order not found');
//         }
//       } catch (error) {
//         console.error('Error updating order status:', error);
//         // Emit error event back to the client if needed
//         socket.emit('orderStatusUpdated', { success: false, error: error.message });
//       }
//     });
//   });
// }

// export default initializeSocket;


// import express from 'express';
// import http from 'http';
// import initializeSocket from './socket.js';
// import orderRoutes from './routes/orders.js';

// const app = express();
// const server = http.createServer(app);

// // Initialize Socket.IO
// initializeSocket(server);

// // Mount order routes
// app.use('/orders', orderRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
