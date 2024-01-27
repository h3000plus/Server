


import { Request, Response } from "express";
import { createMenuItem, getMenuItemById, getMenuItemByResId, searchRestaurantItems } from "../models/item/query.js";
import { getItemDetails, getMenuItemsByRestaurant } from "../service/restaurant.service.js";
export const createMenuItemController = async(req: Request, res: Response)=>{
    try {
        const objectOfMenuItem = {... req.body};
        const menuItem = await createMenuItem(objectOfMenuItem);
        res.status(201).json(menuItem);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

export const getMenuItemByIdController = async(req: Request, res: Response)=>{
    try {
        const id = req.params.item_id;
        const oneMenuItem = await getItemDetails(id);
        res.status(200).json(oneMenuItem);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

export const getMenuItemByResIdController = async(req: Request, res: Response)=>{
    try {
        const id = req.params.res_id;
        
        const resItems = await getMenuItemsByRestaurant(id);
        res.status(200).json(resItems);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

export const searchRestaurantItemsController = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;
        const { searchTerm } = req.query;

        // Check if required parameters are provided
        if (!restaurantId || !searchTerm) {
            return res.status(400).json({ error: 'restaurantId and searchTerm are required parameters.' });
        }

        // Call the searchRestaurantItems function
        const restaurantItems = await searchRestaurantItems(String(restaurantId), String(searchTerm));

        // Return the results
        res.status(200).json(restaurantItems);
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
