import express from 'express';
import { updateOrderStatus } from '../controllers/orderStatus.controller.js';

const router = express.Router();

router.put('/update-status', updateOrderStatus);

export default router;
