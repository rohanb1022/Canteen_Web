// import Order from '../models/order.model.js';

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

import Order from '../models/order.model.js';

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
