import express from "express";
import {
  createRestaurantController,
  getAllDeliveryRestaurantController,
  getAllRestaurantsByCuisineController,
  getFilteredRestaurantsController,
  getRestaurantByIdController,
  searchAllDeliveryRestaurantsController,
  createMenuItems,
} from "../controllers/restaurant.controller.js";
import protectMiddleware from "../middlewares/protect.middleware.js";
import { getFilteredRestaurants } from "../service/restaurant.service.js";

const router = express.Router();

// dummy
router.post("/restaurants/delivery", createRestaurantController);

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
router.post("/restaurants/delivery/recently-viewed");
router.get("/restaurants/delivery/recently-viewed/:user_id");
router.get("/restaurants/delivery/recommended/:user_id");
router.get("/restaurants/delivery/top-10");
router.get("/restaurants/delivery/popular");

// pickup
router.get("/restaurants/pickup");
router.get("/restaurants/pickup/:cuisine");
router.get("/restaurants/pickup/search?");

// favorite
router.post("/restaurants/favorite");
router.get("/restaurants/favorite/:user_id");

// restaurant details
router.get("/details/:restaurant_id", getRestaurantByIdController);
router.post("/menu-items-two", createMenuItems);

export default router;
