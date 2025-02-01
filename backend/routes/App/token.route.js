import express from 'express';
import Order from '../../models/order.model.js';

const router = express.Router();


// Route to send token
router.post('/generatetoken',async (req, res) => {
  //need to work on this.
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Find the latest order for the given userId
    const order = await Order.findOne({ userId }).sort({ orderDate: -1 });

    if (!order) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    // Extract only the last 4 characters of orderId (_id)
    const shortOrderId = order._id.toString().slice(-4);

    res.status(200).json({
      success: true,
      orderId: shortOrderId
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  
});

export default router;
