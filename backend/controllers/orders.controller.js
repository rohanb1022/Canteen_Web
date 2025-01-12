import Order from '../models/order.model.js';

export const getOrderCards = async (req, res) => {
  try {
    // Fetch orders and populate user details and food items
    const orders = await Order.find()
      .populate('userId', 'username email') // Populate user details
      .populate({
        path: 'foodItems.foodItemId', // Populate food item details in the array
        select: 'name price' // Select only the fields we need
      })
      .sort({ createdAt: -1 }); // Sort by creation date

    // Map over the fetched orders to structure data for cards
    const orderCards = orders.map(order => ({
      orderId: order._id, // Order ID
      userName: order.userId ? order.userId.username : 'Unknown User', // User's name
      totalAmount: order.totalAmount, // Total amount of the order
      status: order.status, // Order status (e.g., pending, completed)
      orderDate: order.orderDate, // Order date
      items: order.foodItems.map(item => ({
        foodName: item.foodItemId ? item.foodItemId.name : 'Unknown', // Food item name
        quantity: item.quantity, // Quantity of the food item
        price: item.price // Price of the food item
      }))
    }));

    // Respond with the formatted order cards
    res.json(orderCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
