import express from 'express';
import { getFoodItems , addFoodItem , updateProductAvailability, addSpecialDish} from '../controllers/products.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Route for fetching  in products
router.get('/products', getFoodItems);

// Route for updating product availability
router.put('/products/:id'    ,protectRoute, updateProductAvailability);
router.post('/addSpecialDish' , addSpecialDish);
export default router;
