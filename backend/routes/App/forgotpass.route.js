import express from 'express';
import crypto from 'crypto';
import AppUser from '../../models/appuser.model.js';
import transporter from '../../config/nodemailer.js';

const router = express.Router();

router.post('/forgotpass', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await AppUser.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Save token in DB
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL}/ForgotPassword/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset link sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
