import Order from '../models/order.model.js';

export const getStatistics = async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await Order.countDocuments();

    // Total revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Number of completed orders
    const completedOrders = await Order.countDocuments({ status: 'Completed' });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      completedOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
