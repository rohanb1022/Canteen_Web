import mongoose from 'mongoose';

const addSpecialDishSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false,
      default : "https://st3.depositphotos.com/3591429/13390/i/450/depositphotos_133904692-stock-photo-template-with-special-concept.jpg"
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

export const SpecialDish = mongoose.model('SpecialDish', addSpecialDishSchema);
