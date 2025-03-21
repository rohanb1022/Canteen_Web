import express from "express";
import { submitReview, getReviewsForFoodItem } from "../../controllers/App/Review.controller.js";

const router = express.Router();

router.post("/submit", submitReview);  // Submit a review
router.get("/getreviews/:foodItemId", getReviewsForFoodItem);  // Get reviews for a food item

export default router;
