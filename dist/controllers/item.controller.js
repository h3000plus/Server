import { createMenuItem, searchRestaurantItems } from "../models/item/query.js";
import { getItemDetails, getMenuItemsByRestaurant } from "../service/restaurant.service.js";
export const createMenuItemController = async (req, res) => {
    try {
        const objectOfMenuItem = { ...req.body };
        const menuItem = await createMenuItem(objectOfMenuItem);
        res.status(201).json(menuItem);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
export const getMenuItemByIdController = async (req, res) => {
    try {
        const id = req.params.item_id;
        const oneMenuItem = await getItemDetails(id);
        res.status(200).json(oneMenuItem);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
export const getMenuItemByResIdController = async (req, res) => {
    try {
        const id = req.params.res_id;
        const resItems = await getMenuItemsByRestaurant(id);
        res.status(200).json(resItems);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
export const searchRestaurantItemsController = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { searchTerm } = req.query;
        if (!restaurantId || !searchTerm) {
            return res.status(400).json({ error: 'restaurantId and searchTerm are required parameters.' });
        }
        const restaurantItems = await searchRestaurantItems(String(restaurantId), String(searchTerm));
        res.status(200).json(restaurantItems);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
//# sourceMappingURL=item.controller.js.map