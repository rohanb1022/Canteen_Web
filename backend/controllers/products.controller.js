// import {FoodItem } from '../models/foodItem.model.js'; // Import the food item model
// import { SpecialDish } from '../models/specialDish.model.js';

// // Controller for adding a new food item
// export const addFoodItem = async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { name, price, description, availability, stock, img } = req.body;

//     // Create a new food item
//     const newFoodItem = new FoodItem({
//       name,
//       price,
//       description,
//       availability,
//       stock,
//       img,
//     });

//     // Save the food item to the database
//     await newFoodItem.save();

//     // Send success response
//     res.status(201).json({
//       success: true,
//       message: 'Food item added successfully',
//       data: newFoodItem,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Failed to add food item.',
//     });
//   }
// };

// // Controller for fetching all food items
// export const getFoodItems = async (req, res) => {
//   try {
//     // Fetch all food items from the database
//     const foodItems = await FoodItem.find();

//     // Send success response with food items data
//     res.status(200).json({
//       success: true,
//       data: foodItems,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Failed to fetch food items.',
//     });
//   }
// };

// // Controller for updating the product availabilit
// export const updateProductAvailability = async (req, res) => {
//   try {
//     const { availability } = req.body;  // Expecting availability in the body
//     const productId = req.params.id;    // Get product ID from the URL parameter

//     // Find and update the product availability
//     const updatedProduct = await FoodItem.findByIdAndUpdate(  // Use FoodItem model here
//       productId,
//       { availability },
//       { new: true }  // Return the updated document
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     // Respond with the updated product
//     res.json({ success: true, product: updatedProduct });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// export const addSpecialDish = async (req, res) => { 
//   try {
//     const { name, price, description, img } = req.body;
//     if(!name || !price) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields',
//       });
//     }
//     const newSpecialDish = new SpecialDish({
//       name,
//       price,
//       description,
//       img,
//     });
//     await newSpecialDish.save();
//     return res.status(201).json({
//       success: true,
//       message: 'Special dish added successfully',
//       data: newSpecialDish,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Failed to add special dish.',
//     });
//   }
// }

// // Controller for fetching all special dishes
// export const getSpecialDishes = async (req, res) => {
//   try {
//     const specialDishes = await SpecialDish.find();
//     if(!specialDishes){
//       return res.status(200).json({
//         success: true,
//         data: {message: 'No special dishes currently available'}
//       })
//     } // Fetch all special dishes
//     res.status(200).json({
//       success: true,
//       data: specialDishes,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Failed to fetch special dishes.',
//     });
//   }
// };

// export const removeSpecialDish = async (req , res) => {
//   try {
//     const specialDishId = req.params.id;
//     const specialDish = await SpecialDish.findByIdAndDelete(specialDishId);
//     if(!specialDish){
//       return res.status(404).json({
//         success: false,
//         message: 'Special dish not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Special dish deleted successfully',
//     });
//   } catch (error) { 
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Failed to delete special dish.',
//     });
//   }
// }


import { FoodItem } from '../models/foodItem.model.js'; // Import the food item model
import { SpecialDish } from '../models/specialDish.model.js';

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

// Controller for fetching all food items with pagination
export const getFoodItems = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query; // Default to page 1, limit 10
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    // Fetch food items with pagination
    const foodItems = await FoodItem.find()
      .skip(skip)
      .limit(parseInt(limit)); // Limit the number of items returned

    const totalItems = await FoodItem.countDocuments(); // Get total number of food items

    res.status(200).json({
      success: true,
      data: foodItems,
      totalPages: Math.ceil(totalItems / limit), // Calculate total pages
      currentPage: parseInt(page), // Return the current page
    });
  } catch (error) {
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

// Controller for adding special dish
// Controller for fetching a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id); // Fetch food item from DB

    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }

    res.status(200).json(foodItem); // Send food item data
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Failed to fetch food item.',
    });
  }
};

//controller for making dish special
export const makeSpecialDish = async (req , res) => {
  try {
    const dishId = req.params.id;   // we will fetch the id of the dish which we want to make special
    const specialDetail = req.body; // storing the detail of the dish which is making it special
    if(dishId && specialDetail){  // if the special detail is empty it will give error
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }
    const updateDish = await FoodItem.findByIdAndUpdate(dishId, {special : specialDetail}, { new: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Failed to make dish special.',
    });
  }
}