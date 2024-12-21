// food.model.js
import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: false },
    available: { type: Boolean, default: true },  // Availability field to track if the item is available
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;  // Export the model using export default
