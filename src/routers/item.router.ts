import express from 'express'
import { createMenuItemController, getMenuItemByIdController, getMenuItemByResIdController, searchRestaurantItemsController } from '../controllers/item.controller.js';
import { searchRestaurantItems } from '../models/item/query.js';
const router = express.Router();

//dummy
router.post('/item/create', createMenuItemController)

// items
router.get('/items/:res_id', getMenuItemByResIdController);
router.get('/items/:restaurantId/search', searchRestaurantItemsController);
router.get('/items/:restaurant_id/:category');

// item details
router.get('/itemDetails/:item_id', getMenuItemByIdController);

export default router;




// import { createMenuItemController,getAllMenuItemController,getMenuItemByIdController,updateMenuItemByIdController,deleteMenuItemController } from '../controllers/item.controller.js'
// router.get('/items',getAllMenuItemController);
// router.get('/items/:id',getMenuItemByIdController);
// router.post('/items/create',createMenuItemController);
// router.put('/items/edit/:id',updateMenuItemByIdController);
// router.delete('/items/delete/:id',deleteMenuItemController);
