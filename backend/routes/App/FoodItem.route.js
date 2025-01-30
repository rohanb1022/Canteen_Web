import express from 'express';
import FoodItem from '../../models/foodItem.model.js'; // Assuming you have a FoodItem model
import protectRoute from '../../middleware/App/protectRoute.js';

const router = express.Router();

// Get all food items with specific fields
router.get('/fooditem', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({}, 'img rating name category price');
    
    res.status(200).json({
      success: true,
      data: foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error); // Proper error logging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


// Get individual food item details
router.get('/fooditem/:id',protectRoute ,  async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id, 'img price rating name description');
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
    res.json(foodItem);
    console.log("data sent: ",foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
