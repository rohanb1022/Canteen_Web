import Order from '../models/order.model.js';

export const getOrderCards = async (req, res) => {
  try {
    // Fetch orders that are not completed or rejected
    const orders = await Order.find({ status: { $nin: ['completed', 'rejected'] } })
      .populate('userId', 'username email') // Populate user details
      .populate({
        path: 'foodItems.foodItemId',
        select: 'name price'
      })
      .sort({ createdAt: -1 }); // Sort by creation date

    // Map over the fetched orders to structure data for cards
    const orderCards = orders.map(order => ({
      orderId: order._id,
      userName: order.userId ? order.userId.username : 'Unknown User',
      totalAmount: order.totalAmount,
      status: order.status,
      orderDate: order.orderDate,
      items: order.foodItems.map(item => ({
        foodName: item.foodItemId ? item.foodItemId.name : 'Unknown',
        quantity: item.quantity,
        price: item.price
      }))
    }));

    res.json(orderCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPreparedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'prepared' })
    .populate('userId', 'username email') // Populate user details
    .populate({
      path: 'foodItems.foodItemId',
      select: 'name price'
    })
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};