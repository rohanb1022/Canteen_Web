import express from 'express';
import { getOrderCards } from '../../controllers/orders.controller.js'; 
import protectRoute from '../../middleware/App/protectRoute.js';
import { getOrderStatus } from '../../controllers/orderStatus.controller.js';

const router = express.Router();

// Route for fetching orders in card format
// router.get('/view-orders',protectRoute ,  getOrderCards);
router.get('/view-orders/:userId',  getOrderStatus);

export default router;
