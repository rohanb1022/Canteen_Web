
import mongoose from 'mongoose';

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
    type: Boolean,
    required: true,
    default: true
  },
  stock: {
    type: Number,
    required: false,
    default: 0
  },
  img: {
    type: String,  // This field will store the image URL or path
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true,
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
