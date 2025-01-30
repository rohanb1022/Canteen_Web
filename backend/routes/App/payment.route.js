import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();
// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_kNTNMzLSu9RLNK', // Replace with your Razorpay key ID
  key_secret: 'bw8RYAX3Jndu212nhwDOKvv0', // Replace with your Razorpay key secret
});

// Route to create an order
router.post('/createOrder', async (req, res) => {
  const { amount } = req.body; // Amount should come in rupees

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
    });

    res.status(200).json(order); // Return the order object to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Route to verify payment
router.post('/payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  // Generate the expected signature
  const expectedSignature = crypto
    .createHmac('sha256', 'bw8RYAX3Jndu212nhwDOKvv0') // Replace with your Razorpay key secret
    .update(body.toString())
    .digest('hex');

  // Compare the signatures
  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ message: 'Payment verified successfully!' });
  } else {
    res.status(400).json({ error: 'Invalid payment signature!' });
  }
});

// Default export
export default router;
