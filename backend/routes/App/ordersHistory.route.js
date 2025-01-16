import express from 'express';
import { getOrderHistory } from '../../controllers/orderHistory.controller.js'; 
import protectRoute from '../../middleware/App/protectRoute.js';
const router = express.Router();

// Route for fetching order history
router.get('/order-history' , protectRoute , getOrderHistory);

export default router;
