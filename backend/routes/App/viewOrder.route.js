import express from 'express';
import { getOrderCards } from '../../controllers/orders.controller.js'; 
import protectRoute from '../../middleware/App/protectRoute.js';
const router = express.Router();

// Route for fetching orders in card format
router.get('/view-orders',protectRoute ,  getOrderCards);

export default router;
