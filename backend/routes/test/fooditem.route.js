import express from 'express';
import { createFoodItem } from '../../controllers/test/createItem.js';  // Import the controller

const router = express.Router();

// POST route for creating a new food item
router.post('/create', createFoodItem);  // This will call the createFoodItem controller

export default router;
