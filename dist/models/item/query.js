// import CounterItemModel from './counterItemModel.js';
// import ItemModel from './model.js';
import { itemModel } from "./model.js";
// import { AddOptionInterface,NoOptionInterface,IngredientsInterface,PackagingInterface,ItemDietaryRestrictionsInterface,IItem } from "../../interfaces/item.interface.js";
const createMenuItem = async (menuItemObject) => {
    const newMealItem = await itemModel.create({ ...menuItemObject });
    return newMealItem;
};
const getMenuItemById = async (id) => {
    const singleItem = await itemModel.findOne({ _id: id });
    return singleItem;
};
const getMenuItemByResId = async (id) => {
    const resItems = await itemModel.find({ resId: id });
    return resItems;
};
const searchRestaurantItems = async (restaurantId, searchTerm) => {
    try {
        const query = {
            resId: restaurantId,
            name: { $regex: new RegExp(searchTerm, 'i') }
        };
        return await itemModel.find(query);
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export { createMenuItem, getMenuItemById, getMenuItemByResId, searchRestaurantItems };
//# sourceMappingURL=query.js.map