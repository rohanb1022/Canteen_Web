import { FoodItem } from '../models/foodItem.model.js';
import { SpecialDish } from '../models/specialDish.model.js';

// Controller for adding a new food item
export const addFoodItem = async (req, res) => {
  try {
    const { name, price, description, availability, stock, img } = req.body;
    const newFoodItem = new FoodItem({
      name,
      price,
      description,
      availability,
      stock,
      img,
    });
    await newFoodItem.save();
    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      data: newFoodItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to add food item.',
    });
  }
};

// Controller for fetching all food items with pagination
export const getFoodItems = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;
    const foodItems = await FoodItem.find()
      .skip(skip)
      .limit(parseInt(limit));
    const totalItems = await FoodItem.countDocuments();
    res.status(200).json({
      success: true,
      data: foodItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to fetch food items.',
    });
  }
};

// Controller for updating product availability
export const updateProductAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const productId = req.params.id;
    const updatedProduct = await FoodItem.findByIdAndUpdate(
      productId,
      { availability },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Controller for removing a food item
export const removeFoodItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await FoodItem.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Food item removed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to remove food item.',
    });
  }
};

// Controller for fetching a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to fetch food item.',
    });
  }
};

// Controller for making dish special
export const makeSpecialDish = async (req, res) => {
  try {
    const dishId = req.params.id;
    const specialDetail = req.body;
    if (!dishId || !specialDetail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }
    const updateDish = await FoodItem.findByIdAndUpdate(
      dishId,
      { special: specialDetail },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Dish updated to special successfully',
      data: updateDish,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Failed to make dish special.',
    });
  }
};


export const changePrice = async (req, res) => {
  try {
    const dishId = req.params.dishId;
    const newPrice = req.body.price;

    if (newPrice === undefined || newPrice === null || isNaN(Number(newPrice))) {
      return res.status(400).json({ message: 'Price is required and must be a number' });
    }

    const dish = await FoodItem.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    dish.price = Number(newPrice);
    await dish.save();

    return res.status(200).json({
      success: true,
      message: 'Dish price updated successfully',
    });
  } catch (error) {
    console.error("changePrice error:", error.message, "\nFull error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
