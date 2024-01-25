import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/user.router.js';
import itemRouter from './routers/item.router.js';
import orderRouter from './routers/order.router.js';
import restaurantRouter from './routers/restaurant.router.js'
import cuisineRouter from './routers/category.router.js';

config();

// connect ot MongoDB database
// const dbUri: string = config.DB_URI


const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

app.use(userRouter);
app.use(restaurantRouter);
app.use(itemRouter);
app.use(orderRouter);
app.use(cuisineRouter);


app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

async function main (){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/marketplace')
        console.log('mongoose connected')
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

main()