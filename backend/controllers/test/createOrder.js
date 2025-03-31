import Order from '../../models/order.model.js';
import AppUser from '../../models/appuser.model.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, foodItems, totalAmount, paymentId } = req.body;
    console.log("Received Order Request:", req.body);
    if (!userId || !foodItems || !totalAmount || !paymentId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).json({ message: 'Invalid foodItems format' });
    }
    const user = await AppUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newOrder = new Order({
      userId,
      foodItems,
      totalAmount,
      paymentId,
      status: 'pending',
    });

    try {
      await newOrder.save();
      console.log("Order Saved:", newOrder);
      res.status(201).json({
        message: 'Order created successfully',
        order: newOrder
      });
    } catch (error) {
      console.error("Error saving order:", error);
      return res.status(500).json({ message: "Database error", error });
    }
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
