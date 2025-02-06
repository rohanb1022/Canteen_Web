import express from 'express';
import otpGenerator from 'otp-generator';
import AppUser from '../../models/appuser.model.js';
import transporter from '../../config/nodemailer.js';

const router = express.Router();

// Forgot Password - Step 1: Send OTP
router.post('/forgotpass', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await AppUser.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a 4-digit OTP using otp-generator
    const otp = otpGenerator.generate(4, { digits: true, alphabets: false, specialChars: false });

    // Set OTP expiration time (5 minutes)
    const otpExpires = Date.now() + 300000; // 5 minutes in milliseconds

    // Save OTP and its expiration time to the user's document in DB
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'OTP for Password Reset',
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. This OTP is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Forgot Password - Step 2: Verify OTP
router.post('/verifyOtp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP and email are provided
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find user by email
    const user = await AppUser.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if OTP is correct and has not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid, proceed to password reset screen
    res.json({ message: 'OTP verified successfully, proceed to reset password' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
