import express from 'express';
import { getFoodItems , addFoodItem , updateProductAvailability} from '../../controllers/products.controller.js'; 
import protectRoute from '../../middleware/App/protectRoute.js';

const router = express.Router();

// Route for fetching  in products
router.get('/products', protectRoute , getFoodItems);

// Route for updating product availability
router.put('/products/:id',protectRoute, updateProductAvailability);

export default router;
