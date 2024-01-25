import { restaurantModel } from "./model.js";
const getAllDeliveryRestaurant = async () => {
    try {
        return await restaurantModel.find({ delivery: true });
    }
    catch (error) {
        console.error('Error :', error);
        throw error;
    }
};
const createRestaurant = async (restaurantInfo) => {
    try {
        const restaurant = await restaurantModel.create({ ...restaurantInfo });
        return restaurant;
    }
    catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};
const searchAllDeliveryRestaurant = async (searchTerm) => {
    try {
        const query = {
            delivery: true,
            name: { $regex: new RegExp(searchTerm, 'i') }
        };
        return await restaurantModel.find(query);
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
const getRestaurantById = async (restaurantId) => {
    try {
        const restaurant = await restaurantModel.findById(restaurantId).exec();
        return restaurant;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
const getAllRestaurantsByCuisine = async (cuisineName) => {
    try {
        const restaurants = await restaurantModel.find({ cuisine: cuisineName }).exec();
        return restaurants;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export { getAllDeliveryRestaurant, createRestaurant, searchAllDeliveryRestaurant, getRestaurantById, getAllRestaurantsByCuisine };
//# sourceMappingURL=query.js.map