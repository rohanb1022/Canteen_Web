import { FoodItem } from "../../models/foodItem.model.js";

export const submitReview = async (req, res) => {
  try {
    const { foodItemNames, rating, comment } = req.body;

    if (!foodItemNames || !rating || foodItemNames.length === 0) {
      console.error("Validation failed: All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find and update food items
    const updatedFoodItems = await FoodItem.find({ name: { $in: foodItemNames } });

    if (updatedFoodItems.length === 0) {
      console.error("Food items not found");
      return res.status(404).json({ message: "Food items not found" });
    }

    // Add review and update average rating for each food item
    await Promise.all(
      updatedFoodItems.map(async (foodItem) => {
        foodItem.reviews.push({ rating, comment });

        // Calculate new average rating
        const totalRatings = foodItem.reviews.reduce((sum, review) => sum + review.rating, 0);
        foodItem.rating = totalRatings / foodItem.reviews.length;

        await foodItem.save();
        console.log("Updated food item:", foodItem);
      })
    );

    console.log("Review(s) submitted successfully");
    res.status(200).json({ message: "Review(s) submitted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
