


import Order from "../models/order.model.js";

export const getOrderHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Build query
    const query = status ? { status } : {};

    // Fetch orders and populate user details
    const orders = await Order.find(query)
      .populate("userId", "username email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ orderDate: -1 });

    const totalOrders = await Order.countDocuments(query); // Get total order count for pagination
    const totalPages = Math.ceil(totalOrders / limit); // Calculate total pages

    // Map the fetched orders to include order number, status, user info, and totalAmount
    const orderHistory = orders.map((order) => {
      if (!order.userId) {
        return {
          orderNo: order._id,
          status: order.status,
          userName: "N/A",
          email: "N/A",
          totalAmount: order.totalAmount,
          createdAt: order.orderDate,
        };
      }

      return {
        orderNo: order._id,
        status: order.status,
        userName: order.userId.username,
        email: order.userId.email,
        totalAmount: order.totalAmount,
        createdAt: order.orderDate,
      };
    });

    res.json({
      orders: orderHistory,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
