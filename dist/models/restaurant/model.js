import { Schema, model } from "mongoose";
const restaurantSchema = new Schema({
    name: String,
    image: String,
    deliveryFee: Number,
    deliveryTime: Number,
    like: String,
    cuisine: String,
    delivery: Boolean,
    pickup: Boolean
});
export const restaurantModel = model('restaurants', restaurantSchema);
//# sourceMappingURL=model.js.map