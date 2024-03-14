import { Request, Response } from "express";
import {
  getAllDeliveryRestaurant,
  createRestaurant,
  searchAllDeliveryRestaurant,
  getAllRestaurantsByCuisine,
} from "../models/restaurant/query.js";

import {
  getCuisines,
  getFilteredRestaurants,
  getRestaurantDetails,
} from "../service/restaurant.service.js";

export const getAllDeliveryRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    const deliveryRestaurants = await getAllDeliveryRestaurant();
    res.status(200).json(deliveryRestaurants);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getFilteredRestaurantsController = async (
  req: Request,
  res: Response
) => {
  try {
    const mode = req.query.mode as string;
    const searchTerm = req.query.searchTerm as string;
    const cuisine = req.query.cuisine as string;

    const restaurants = await getFilteredRestaurants(mode, searchTerm, cuisine);

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getCuisinesController = async (req: Request, res: Response) => {
  try {
    const cuisines = await getCuisines();
    res.json({ cuisines });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const createRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurantInfo = { ...req.body };
    const createdRestaurant = await createRestaurant(restaurantInfo);
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Define the controller function

export const searchAllDeliveryRestaurantsController = async (
  req: Request,
  res: Response
) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const results = await searchAllDeliveryRestaurant(searchTerm);
    res.json(results);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getRestaurantByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurantId = req.params.restaurant_id;

    const restaurant = await getRestaurantDetails(restaurantId);

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getAllRestaurantsByCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cuisine } = req.params;

    const restaurants = await getAllRestaurantsByCuisine(cuisine);

    if (restaurants) {
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};