import Order from '../models/order.model.js';
import AppUser from '../models/appuser.model.js';
import { FoodItem } from '../models/foodItem.model.js';

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;

//     // Check if status is valid
//     const validStatuses = ['pending', 'completed', 'accepted', 'rejected', 'prepared'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: 'Invalid order status' });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({ message: `Order ${orderId} updated to ${status}`, order: updatedOrder });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Check if status is valid
    const validStatuses = ['pending', 'completed', 'accepted', 'rejected', 'prepared'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    // Check if order was found
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: `Order ${orderId} updated to ${status}`, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const removePerticularDish = async (req, res) => {
  try {
    const { orderId, foodName } = req.body; // Accept foodName from frontend

    // Find the order
    const order = await Order.findById(orderId).populate("foodItems.foodItemId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the correct foodItemId for the given foodName
    const foodItem = order.foodItems.find(
      (item) => item.foodItemId.name === foodName
    );

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found in order" });
    }

    // Remove the item using `$pull`
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $pull: { foodItems: { foodItemId: foodItem.foodItemId._id } } },
      { new: true }
    );

    return res.status(200).json({
      message: "Dish removed successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error removing dish:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    

    const order = await Order.findById(orderId)
      .populate('foodItems.foodItemId', 'name')
      .lean(); // Convert Mongoose object to plain JSON for debugging

     // Log entire order object

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      orderId: order._id,
      date: order.orderDate.toISOString().split('T')[0], // Extract date
      time: order.orderDate.toISOString().split('T')[1].split('.')[0], // Extract time
      items: order.foodItems.map(item => ({
        itemId: item.foodItemId._id,
        name: item.foodItemId.name, // Food item name
        quantity: item.quantity,
        price: item.price
      })),
      status: order.status
    });
//
  } catch (error) {
    console.error("Error fetching order:", error); // Log error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getOrderByUserId = async(req, res) => {
  try {
    const { userId } = req.params;

    // Find the latest ongoing order for the user
    const latestOrder = await Order.findOne({ userId, status: { $in: ["pending", "Ongoing" , "completed" , "accepted" , "rejected" , "prepared"] } })
        .sort({ orderDate: -1 }) // Sort by latest order
        .select("orderId status");

    if (latestOrder) {
        return res.json({ latestOrder});
    } else {
        return res.json({ message:"No"});
    }
} catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
}
}
