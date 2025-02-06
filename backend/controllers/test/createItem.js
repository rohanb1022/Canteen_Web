import {FoodItem} from '../../models/foodItem.model.js'; // Import the FoodItem model

// Controller for creating a new food item
export const createFoodItem = async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { name, price, description, availability, stock } = req.body;

    // Validate required fields
    if (!name || !price || typeof availability !== 'boolean' || !stock) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if a food item with the same name already exists (optional)
    const existingFoodItem = await FoodItem.findOne({ name });
    if (existingFoodItem) {
      return res.status(400).json({ message: 'Food item with this name already exists' });
    }

    // Create a new food item object
    const newFoodItem = new FoodItem({
      name,
      price,
      description,
      availability,
      stock
    });

    // Save the new food item to the database
    await newFoodItem.save();

    // Respond with the created food item details
    res.status(201).json({
      message: 'Food item created successfully',
      foodItem: newFoodItem
    });
  } catch (error) {
    // Log error and respond with a 500 status
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
