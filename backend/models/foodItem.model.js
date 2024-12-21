import mongoose from 'mongoose';

// Define the schema for the FoodItem model
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  availability: {
    type: Boolean,  // Can be a boolean to indicate availability (true/false)
    required: true,
    default: true   // Default to true if no value is provided
  },
  stock: {
    type: Number,  // If you'd like to manage stock quantity
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent overwriting the model if it already exists
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
