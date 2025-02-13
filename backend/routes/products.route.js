import express from 'express';
import { getFoodItems , addFoodItem , updateProductAvailability , getFoodItemById} from '../controllers/products.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/products', getFoodItems); // Route for fetching  in products
router.put('/products/:id' ,protectRoute, updateProductAvailability); // Route for updating product availability
router.post('/addDish'     ,protectRoute, addFoodItem); // route for adding the dish
router.get('/products/:id', getFoodItemById); // Route to get a single food item

export default router;
