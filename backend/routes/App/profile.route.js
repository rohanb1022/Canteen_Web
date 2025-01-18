import express from 'express';
import AppUser from '../../models/appuser.model.js';
import protectRoute from '../../middleware/App/protectRoute.js';

const router = express.Router();


router.get('/profile', protectRoute , async (req, res) => {
  try {
    // Assuming you have some way to get the current user's ID
    const userId = req.user.id;
    const user = await AppUser.findById(userId, 'username phoneNumber email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT profile route for updating user details
router.put('/profile', protectRoute, async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email , phoneNumber } = req.body;

    // Validate the fields
    if (!username || !email || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user and update the details
    const updatedUser = await AppUser.findByIdAndUpdate(
    userId,
    { username , email, phoneNumber },
    { new: true, runValidators: true } // Return the updated user and validate
);

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});

export default router;