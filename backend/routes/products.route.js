import express from 'express';
import { getFoodItems , addFoodItem , updateProductAvailability} from '../controllers/products.controller.js'; 
const router = express.Router();

// Route for fetching  in products
router.get('/products', getFoodItems);

// Route for updating product availability
router.put('/products/:id', updateProductAvailability);

export default router;
