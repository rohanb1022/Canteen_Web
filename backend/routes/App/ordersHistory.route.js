import express from 'express';
import { getOrderHistory } from '../../controllers/App/orderHistory.controller.js'; 
import protectRoute from '../../middleware/App/protectRoute.js';
const router = express.Router();

// Route for fetching order history
router.get('/order-history/:userId' ,getOrderHistory);

export default router;
