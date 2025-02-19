import express from 'express';
import { updateOrderStatus } from '../controllers/orderStatus.controller.js';
import { getPreparedOrders } from '../controllers/orders.controller.js';

const router = express.Router();

router.put('/update-status', updateOrderStatus);
router.get('/preparedOrder' , getPreparedOrders);

export default router;
