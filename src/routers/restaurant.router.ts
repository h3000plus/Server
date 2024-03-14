import express from "express";
import {
  createRestaurantController,
  getAllDeliveryRestaurantController,
  getAllRestaurantsByCuisineController,
  getFilteredRestaurantsController,
  getRestaurantByIdController,
  searchAllDeliveryRestaurantsController,
} from "../controllers/restaurant.controller.js";
import protectMiddleware from "../middlewares/protect.middleware.js";

const router = express.Router();

router.get("/restaurants", getFilteredRestaurantsController);

// delivery
router.get(
  "/restaurants/delivery",
  protectMiddleware,
  getAllDeliveryRestaurantController
);
router.get(
  "/restaurants/delivery/:cuisine",
  getAllRestaurantsByCuisineController
);
router.get(
  "/restaurants/delivery/search",
  searchAllDeliveryRestaurantsController
);

// restaurant details
router.get("/details/:restaurant_id", getRestaurantByIdController);

export default router;
