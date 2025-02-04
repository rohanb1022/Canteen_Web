import express from 'express';
import { updateOrderStatus } from '../controllers/orderStatus.controller.js';

const router = express.Router();

// router.put('/update-status', updateOrderStatus);
// Route for fetching ongoing orders view paste this in viewOrder.route.js
router.get('/view-orders/:userId',  getOrderCards);

export default router;
