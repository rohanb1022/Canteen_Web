import express from 'express';
import { addSpecialDish } from '../controllers/products.controller.js'; // Import the function

const router = express.Router();

console.log("Special dish route loaded");
router.post('/specialDish', addSpecialDish); // Define the route to add a special dish
console.log("Special dish route loaded");

export default router;
