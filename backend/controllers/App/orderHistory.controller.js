import AppUser from "../../models/appuser.model.js";
import Order from "../../models/order.model.js";

export const getOrderHistory = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Check if the user exists
        const user = await AppUser.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Fetch only completed orders for the user
        const completedOrders = await Order.find({ 
            userId: userId, 
            status: { $in: ['pending', 'completed', 'accepted', 'rejected', 'prepared'] }  // Fetch only completed orders
        })
        .populate('userId', 'username email') // Populate user details
        .populate({
            path: 'foodItems.foodItemId',
            select: 'name price' // Populate food item details
        })
        .sort({ createdAt: -1 }); // Sort by creation date

        // If no completed orders are found
        if (completedOrders.length === 0) {
            return res.json({ message: "No Completed orders found" });
        }

        // Map over the fetched orders to structure data for response
        const orderHistory = completedOrders.map(order => ({
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

        res.json(orderHistory);
    } catch (error) {
        console.log(error.message, "The error is coming from getOrderHistory function of app side");
        return res.status(500).json({ message: "Internal server error" });
    }
};
