import express from 'express';
import { updateOrderStatus , getOrderStatus} from '../controllers/orderStatus.controller.js';


const router = express.Router();

router.put('/update-status', updateOrderStatus);
router.get('/get-status/:orderId', getOrderStatus);

export default router;

