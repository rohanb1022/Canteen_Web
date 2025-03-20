import express from 'express';
import { updateOrderStatus , getOrderStatus , removePerticularDish} from '../controllers/orderStatus.controller.js';


const router = express.Router();

router.put('/update-status', updateOrderStatus);
router.get('/get-status/:orderId', getOrderStatus);
router.put('/remove-dish', removePerticularDish);

export default router;

