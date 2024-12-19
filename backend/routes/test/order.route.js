import express from 'express';
import { createOrder } from '../../controllers/test/createOrder.js';

const router = express.Router();

// POST route to create an order
router.post('/create', createOrder);

export default router;
