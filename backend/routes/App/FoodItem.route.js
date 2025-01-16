import express from 'express';
import FoodItem from '../../models/foodItem.model.js'; // Assuming you have a FoodItem model

const router = express.Router();

// // Get all food items with specific fields
// router.get('/fooditem', async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find({}, 'image rating name category price');
//     console.log("error", foodItems);
//     res.json(foodItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get individual food item details
router.get('/fooditem/:id', async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id, 'image price rating name description');
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;