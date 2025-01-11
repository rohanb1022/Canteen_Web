import Order from '../models/order.model.js';

export const getStatistics = async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await Order.countDocuments();

    // Total revenue from completed orders
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'completed' } },  // Filter for completed orders
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Number of completed orders
    const completedOrders = await Order.countDocuments({ status: 'completed' });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,  // Return total revenue if available, else 0
      completedOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
