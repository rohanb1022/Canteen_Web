// import Order from '../models/order.model.js';
// import AppUser from '../models/appuser.model.js';
// import { FoodItem } from '../models/foodItem.model.js';

// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { orderId, status } = req.body;

// //     // Check if status is valid
// //     const validStatuses = ['pending', 'completed', 'accepted', 'rejected', 'prepared'];
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({ message: 'Invalid order status' });
// //     }

// //     const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

// //     if (!updatedOrder) {
// //       return res.status(404).json({ message: 'Order not found' });
// //     }

// //     res.status(200).json({ message: `Order ${orderId} updated to ${status}`, order: updatedOrder });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;

//     // Check if status is valid
//     const validStatuses = ['pending', 'completed', 'accepted', 'rejected', 'prepared'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: 'Invalid order status' });
//     }

//     // Find the order
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Update the status of all foodItems that are not "rejected" to "accepted"
//     await Order.findByIdAndUpdate(orderId, {
//       $set: { 
//         "foodItems.$[elem].status": "accepted",
//         status: status
//       }
//     }, {
//       arrayFilters: [{ "elem.status": { $ne: "rejected" } }], // Only update non-rejected foodItems
//       new: true
//     });

//     // Fetch the updated order
//     const updatedOrder = await Order.findById(orderId);

//     res.status(200).json({
//       message: `Order ${orderId} updated to ${status}, and non-rejected food items set to 'accepted'`,
//       order: updatedOrder
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// export const removePerticularDish = async (req, res) => {
//   try {
//     const { orderId, foodName } = req.body; // Accept foodName from frontend

//     // Find the order
//     const order = await Order.findById(orderId).populate("foodItems.foodItemId");

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Find the correct foodItem for the given foodName
//     const foodItem = order.foodItems.find(
//       (item) => item.foodItemId.name === foodName
//     );

//     if (!foodItem) {
//       return res.status(404).json({ message: "Food item not found in order" });
//     }

//     // Update the status of the item to 'rejected'
//     const updatedOrder = await Order.findOneAndUpdate(
//       { _id: orderId, "foodItems.foodItemId": foodItem.foodItemId._id },
//       { $set: { "foodItems.$.status": "rejected" } },
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Dish status updated to 'rejected' successfully",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Error updating dish status:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// export const getOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
    

//     const order = await Order.findById(orderId)
//       .populate('foodItems.foodItemId', 'name')
//       .lean(); // Convert Mongoose object to plain JSON for debugging

//      // Log entire order object

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({
//       orderId: order._id,
//       date: order.orderDate.toISOString().split('T')[0], // Extract date
//       time: order.orderDate.toISOString().split('T')[1].split('.')[0], // Extract time
//       items: order.foodItems.map(item => ({
//         itemId: item.foodItemId._id,
//         name: item.foodItemId.name, // Food item name
//         quantity: item.quantity,
//         price: item.price,
//         status:item.status,
//       })),
//       status: order.status
//     });
    
//   } catch (error) {
//     console.error("Error fetching order:", error); // Log error details
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export const getOrderByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find the latest order for the user
//     const latestOrder = await Order.findOne({
//       userId,
//       status: { $in: ["pending", "Ongoing", "completed", "accepted", "rejected", "prepared"] }
//     })
//       .sort({ orderDate: -1 }) // Get the most recent order
//       .select("orderId status");

//     if (!latestOrder) {
//       return res.json({ message: "No orders found" });
//     }

//     // If the latest order is "completed" or "rejected", look for the next latest active order
//     if (["completed", "rejected"].includes(latestOrder.status.toLowerCase())) {
//       const nextOrder = await Order.findOne({
//         userId,
//         status: { $nin: ["completed", "rejected"] } // Exclude completed & rejected
//       })
//       .sort({ orderDate: -1 }) // Get the next latest order
//       .select("orderId status");

//       return res.json({ latestOrder, nextOrder: nextOrder || null }); 
//       // nextOrder will be null if no active order exists
//     }

//     // If the latest order is still active, return it
//     return res.json({ latestOrder });

//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



import Order from '../models/order.model.js';
import AppUser from '../models/appuser.model.js';
import { FoodItem } from '../models/foodItem.model.js';

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Check if status is valid
    const validStatuses = ['pending', 'completed', 'accepted', 'rejected', 'prepared'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Before update - Order:', JSON.stringify(order, null, 2));

    // Update the order status
    order.status = status;

    // If status is "rejected", manually set all foodItems to "rejected"
    if (status === "rejected") {
      order.foodItems = order.foodItems.map(item => ({
        ...item,// Convet Mongoose subdocument to plain object
        status: "rejected"
      }));
    } else {
      // For other statuses, set non-rejected foodItems to "accepted"
      order.foodItems = order.foodItems.map(item => ({
        ...item.toObject(),
        status: item.status === "rejected" ? "rejected" : "accepted"
      }));
    }

    // Save the updated order
    await order.save();
    console.log('After save - Order in memory:', JSON.stringify(order, null, 2));

    // Fetch the updated order from the database to confirm
    const updatedOrder = await Order.findById(orderId);
    console.log('After fetch - Order from DB:', JSON.stringify(updatedOrder, null, 2));

    // Verify the update
    if (status === "rejected" && updatedOrder.foodItems.some(item => item.status !== "rejected")) {
      console.error('Verification failed - Food items not updated:', updatedOrder.foodItems);
      throw new Error('Failed to update all food items to "rejected"');
    }

    res.status(200).json({
      message: `Order ${orderId} updated to ${status}`,
      order: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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

    // Find the correct foodItem for the given foodName
    const foodItem = order.foodItems.find(
      (item) => item.foodItemId.name === foodName
    );

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found in order" });
    }

    // Update the status of the item to 'rejected'
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, "foodItems.foodItemId": foodItem.foodItemId._id },
      { $set: { "foodItems.$.status": "rejected" } },
      { new: true }
    );

    return res.status(200).json({
      message: "Dish status updated to 'rejected' successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating dish status:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('foodItems.foodItemId', 'name')
      .lean(); // Convert Mongoose object to plain JSON for debugging

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
        price: item.price,
        status: item.status,
      })),
      status: order.status
    });
  } catch (error) {
    console.error("Error fetching order:", error); // Log error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the latest order for the user
    const latestOrder = await Order.findOne({
      userId,
      status: { $in: ["pending", "Ongoing", "completed", "accepted", "rejected", "prepared"] }
    })
      .sort({ orderDate: -1 }) // Get the most recent order
      .select("orderId status");

    if (!latestOrder) {
      return res.json({ message: "No orders found" });
    }

    // If the latest order is "completed" or "rejected", look for the next latest active order
    if (["completed", "rejected"].includes(latestOrder.status.toLowerCase())) {
      const nextOrder = await Order.findOne({
        userId,
        status: { $nin: ["completed", "rejected"] } // Exclude completed & rejected
      })
      .sort({ orderDate: -1 }) // Get the next latest order
      .select("orderId status");

      return res.json({ latestOrder, nextOrder: nextOrder || null });
    }

    // If the latest order is still active, return it
    return res.json({ latestOrder });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};