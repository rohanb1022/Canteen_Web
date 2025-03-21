import {FoodItem}  from "../../models/foodItem.model.js";

// Submit a review & update average rating
export const submitReview = async (req, res) => {
  try {
    const { foodItemId, rating, comment } = req.body;

    if (!foodItemId || !rating) {
      return res.status(400).json({ message: "Food item ID and rating are required" });
    }

    // Find the food item
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Add review to the food item's reviews array
    foodItem.reviews.push({ rating, comment });

    // Update total ratings count and new average rating
    foodItem.totalRatings += 1;
    const totalRatingSum = foodItem.reviews.reduce((acc, review) => acc + review.rating, 0);
    foodItem.rating = (totalRatingSum / foodItem.totalRatings).toFixed(1);

    await foodItem.save();

    res.status(201).json({ message: "Review submitted successfully", foodItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReviewsForFoodItem = async (req, res) => {
    try {
      const { foodItemId } = req.params;
  
      // Find the food item and return its reviews
      const foodItem = await FoodItem.findById(foodItemId, "reviews");
      if (!foodItem) {
        return res.status(404).json({ message: "Food item not found" });
      }
  
      res.status(200).json(foodItem.reviews);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  