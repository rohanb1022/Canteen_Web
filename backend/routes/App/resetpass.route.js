import express from 'express';
import bcrypt from 'bcryptjs';
import AppUser from '../../models/appuser.model.js'; // Ensure correct import path

const router = express.Router();

router.post('/resetpassword', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    


    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user by email
    const user = await AppUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid
    if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    

    // Clear reset token
    user.otp = null;
    user.otpExpires = null;
    

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
