// import express from 'express';
// import { getOrderStatus } from '../../controllers/orderStatus.controller';

// const router = express.Router();

// // Route for fetching order status
// router.get('/order-status/:orderId', getOrderStatus);

// export default router;

import express from 'express';
import { getOrderStatus,getOrderByUserId } from "../../controllers/orderStatus.controller.js"

const router = express.Router();

// Correct route for fetching order status
router.get('/order-status/:orderId', getOrderStatus);
router.get("/orders/:userId",getOrderByUserId);

export default router;