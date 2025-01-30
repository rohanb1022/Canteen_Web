import Order from '../models/order.model.js';

export const getOrderHistory = async (req, res) => {
  try {
    // Fetch orders and populate user details (username and email)
    const orders = await Order.find()
      .populate('userId', 'username email')  // Populate user details: username and email
      .sort({ orderDate: -1 });  // Sort orders by order date (newest first)

    // Map the fetched orders to include order number, status, user info, and totalAmount
    const orderHistory = orders.map(order => {
      // Check if order.userId is populated
      if (!order.userId) {
        return {
          orderNo: order._id,  // Use order ID as the order number
          status: order.status,  // Order status (pending, completed, cancelled)
          userName: 'N/A',  // Default if no userId
          email: 'N/A',  // Default if no userId
          totalAmount: order.totalAmount,  // Total amount of the order
          createdAt: order.orderDate  // The date when the order was placed
        };
      }

      return {
        orderNo: order._id,  // Use order ID as the order number
        status: order.status,  // Order status (pending, completed, cancelled)
        userName: order.userId.username,  // User's username
        email: order.userId.email,  // User's email
        totalAmount: order.totalAmount,  // Total amount of the order
        createdAt: order.orderDate  // The date when the order was placed
      };
    });

    // Respond with the formatted order history
    res.json(orderHistory);
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ message: error.message });
  }
};
