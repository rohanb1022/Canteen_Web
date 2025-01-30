import express from 'express';
import bcrypt from 'bcryptjs';
import AppUser from '../../models/appuser.model.js';

const router = express.Router();

router.post('/resetpassword', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Check if token is provided
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Find user by reset token
    const user = await AppUser.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and remove token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
