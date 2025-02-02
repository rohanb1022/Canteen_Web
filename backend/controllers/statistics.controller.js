

// import Order from '../models/order.model.js';
// import mongoose from 'mongoose';

// export const getStatistics = async (req, res) => {
//   try {
//     const { type } = req.query; // 'daily' or 'monthly'

//     let matchStage = {};
//     let groupStage = {};

//     // Setting up aggregation based on type (daily or monthly)
//     if (type === 'monthly') {
//       matchStage = {}; // No filtering needed for monthly data
//       groupStage = {
//         _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
//         totalOrders: { $sum: 1 },
//         totalRevenue: { $sum: "$totalAmount" },
//         completedOrders: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
//       };
//     } else {
//       matchStage = {}; // Default to daily stats
//       groupStage = {
//         _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } },
//         totalOrders: { $sum: 1 },
//         totalRevenue: { $sum: "$totalAmount" },
//         completedOrders: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
//       };
//     }

//     // Aggregation pipeline
//     const stats = await Order.aggregate([
//       { $match: matchStage },
//       { $group: groupStage },
//       { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
//     ]);

//     // Ensure there are enough records for comparison
//     if (stats.length < 2) {
//       // If less than 2 records, return empty for comparison purposes
//       res.json(stats);
//     } else {
//       res.json(stats);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Order from '../models/order.model.js';

export const getStatistics = async (req, res) => {
  try {
    const { type } = req.query; // 'daily' or 'monthly'

    let matchStage = {};
    let groupStage = {};

    // Setting up aggregation based on type (daily or monthly)
    if (type === 'monthly') {
      matchStage = {}; // No filtering needed for monthly data
      groupStage = {
        _id: { year: { $year: "$orderDate" }, month: { $month: "$orderDate" } },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
        completedOrders: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
      };
    } else {
      matchStage = {}; // Default to daily stats
      groupStage = {
        _id: { year: { $year: "$orderDate" }, month: { $month: "$orderDate" }, day: { $dayOfMonth: "$orderDate" } },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
        completedOrders: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
      };
    }

    // Aggregation pipeline
    const stats = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    // Ensure there are enough records for comparison
    if (stats.length < 2) {
      // If less than 2 records, return empty for comparison purposes
      res.json(stats);
    } else {
      res.json(stats);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
