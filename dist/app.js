import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/user.router.js';
import itemRouter from './routers/item.router.js';
import orderRouter from './routers/order.router.js';
import restaurantRouter from './routers/restaurant.router.js';
import cuisineRouter from './routers/category.router.js';
import recommendedEngine from './routers/recommended.engine.router.js';
import { closeMQConnection, connectToMQ } from './service/orderMQ.service.js';
// import initializeSocket from './utilities/socket.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
config();
// connect ot MongoDB database
// const dbUri: string = config.DB_URI
const port = 3000;
const app = express();
// const server = http.createServer(app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});
app.use((req, res, next) => {
    // Attach io to app locals
    res.locals.io = io;
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(userRouter);
app.use(restaurantRouter);
app.use(itemRouter);
app.use(orderRouter);
app.use(cuisineRouter);
app.use(recommendedEngine);
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
// initializeSocket(server);
// io.on('connection', socket => {
//     console.log('A user connected');
//     // Handle disconnect event
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
async function main() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('mongoose connected');
        // Start consuming message from RabbitMQ
        await connectToMQ();
        console.log('MQ Connected');
        httpServer.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    socket.on("join", (data) => {
        console.log("Room userId:", data.userId);
        socket.join(data.userId);
    });
});
// Handle Server Shutdown. Close MQ Connection
process.on('SIGINT', async () => {
    console.log('Closing MQ connection');
    await closeMQConnection();
    process.exit(0);
});
//# sourceMappingURL=app.js.map