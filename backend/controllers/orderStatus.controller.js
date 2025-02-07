import Order from '../models/order.model.js';

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

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: `Order ${orderId} updated to ${status}`, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    //console.log(req.params);

    const order = await Order.findById(orderId).select('status');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ status: order.status});
  } catch (error) {
    res.status(500).json({ message: `Server error`, error: error.message });
  }
};


export const getOrderByUserId = async(req, res) => {
  try {
    const { userId } = req.params;

    // Find the latest ongoing order for the user
    const latestOrder = await Order.findOne({ userId, status: { $in: ["pending", "Ongoing" , "completed" , "accepted" , "rejected" , "prepared"] } })
        .sort({ createdAt: -1 }) // Sort by latest order
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

// const { userId } = req.params;

// // Find all pending orders for the user and sort them by createdAt (ascending)
// const pendingOrders = orders
//     .filter((o) => o.userId === userId && o.status === "pending")
//     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by createdAt

// return res.json({ hasOrder: pendingOrders.length > 0, orders: pendingOrders });
// };