import Order from '../../models/order.model.js';
import AppUser from '../../models/appuser.model.js';

export const createOrder = async (req, res) => {
  try {
    // Extracting the required fields from the request body
    const { userId, foodItems, totalAmount , paymentId } = req.body;

    // Validate required fields
    if (!userId || !foodItems || !totalAmount || paymentId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate userId (check if user exists)
    const user = await AppUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new order object
    const newOrder = new Order({
      userId,
      foodItems,  // No check for foodItemId now
      totalAmount,
      paymentId,
      status: 'pending',  // Default status is pending
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with the created order details
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    // Log error and respond with a 500 status
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
