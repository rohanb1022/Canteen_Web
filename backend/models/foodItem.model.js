
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
    required: false,
    default: 0
  },
  category: {
    type: String,
    required: true,
    default: "uncategorized",
  }
});

const addSpecialDishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false,
    default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.whisktogether.com%2F2013%2F03%2F06%2Fmake-your-own-celebration-plate%2F&psig=AOvVaw3bNWiu8II7n-dryEU0Mbt7&ust=1738486796264000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMD44JKOoosDFQAAAAAdAAAAABAR"
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "uncategorized",
  }
})

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export const SpecialDish = mongoose.model('SpecialDish', addSpecialDishSchema);
