import express from 'express';
import AppUser from '../../models/appuser.model.js';
import protectRoute from '../../middleware/App/protectRoute.js';

const router = express.Router();


router.get('/profile/:id', protectRoute , async (req, res) => {
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

export default router;