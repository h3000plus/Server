import { Schema, model } from "mongoose";
import { RestaurantInterface } from "../../interfaces/restaurant.interface.js";

const restaurantSchema = new Schema<RestaurantInterface>({
    name: String,
    image: String,
    deliveryFee: Number,
    deliveryTime: Number,
    like: String,
    cuisine: String,
    delivery: Boolean,
    pickup: Boolean
});

export const restaurantModel = model<RestaurantInterface>('restaurants', restaurantSchema);