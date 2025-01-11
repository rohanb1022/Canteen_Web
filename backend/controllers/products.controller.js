import FoodItem from '../models/foodItem.model.js'; // Import the food item model

// Controller for adding a new food item
export const addFoodItem = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, price, description, availability, stock, img } = req.body;

    // Create a new food item
    const newFoodItem = new FoodItem({
      name,
      price,
      description,
      availability,
      stock,
      img,
    });

    // Save the food item to the database
    await newFoodItem.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      data: newFoodItem,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to add food item.',
    });
  }
};

// Controller for fetching all food items
export const getFoodItems = async (req, res) => {
  try {
    // Fetch all food items from the database
    const foodItems = await FoodItem.find();

    // Send success response with food items data
    res.status(200).json({
      success: true,
      data: foodItems,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to fetch food items.',
    });
  }
};

// Controller for updating the product availability
export const updateProductAvailability = async (req, res) => {
  try {
    const { availability } = req.body;  // Expecting availability in the body
    const productId = req.params.id;    // Get product ID from the URL parameter

    // Find and update the product availability
    const updatedProduct = await FoodItem.findByIdAndUpdate(  // Use FoodItem model here
      productId,
      { availability },
      { new: true }  // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Respond with the updated product
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
