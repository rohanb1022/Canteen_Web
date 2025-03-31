// import express from 'express';
// import { getFoodItems , addFoodItem , updateProductAvailability , getFoodItemById , makeSpecialDish } from '../controllers/products.controller.js';
// import protectRoute from '../middleware/protectRoute.js';

// const router = express.Router();

// router.get('/products', getFoodItems); // Route for fetching  in products
// router.put('/products/:id' ,protectRoute, updateProductAvailability); // Route for updating product availability
// router.post('/addDish'     ,protectRoute, addFoodItem); // route for adding the dish
// router.get('/products/:id', getFoodItemById); // Route to get a single food item
// router.put('/products/:id' ,protectRoute, makeSpecialDish);

// export default router;

import express from 'express';
import { 
  getFoodItems, 
  addFoodItem, 
  updateProductAvailability, 
  getFoodItemById, 
  makeSpecialDish, 
  removeFoodItem // Add this
} from '../controllers/products.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/products', getFoodItems); // Route for fetching products
router.put('/products/:id', protectRoute, updateProductAvailability); // Route for updating product availability
router.post('/addDish', protectRoute, addFoodItem); // Route for adding a dish
router.get('/products/:id', getFoodItemById); // Route to get a single food item
router.put('/products/:id', protectRoute, makeSpecialDish); // Route to make a dish special
router.delete('/products/:id', protectRoute, removeFoodItem); // Change to this

export default router;