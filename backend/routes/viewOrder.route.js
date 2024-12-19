import express from 'express';
import { getOrderCards } from '../controllers/orders.controller.js'; 
const router = express.Router();

// Route for fetching orders in card format
router.get('/view-orders', getOrderCards);

export default router;
