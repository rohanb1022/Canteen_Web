
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
    required: false,
    default : "https://images.unsplash.com/photo-1519077336050-4ca5cac9d64f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        required: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  category: {
    type: String,
    required: true,
    default: "uncategorized",
  },
  special : {
      dishName : {
        type : String
      },
      price : {
        type : Number
      },
    }
});

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);

