import express from 'express';

const router = express.Router();

// middleware part remaining
router.post('/payment', (req, res) => {
    // Handle the payment logic here
    res.send('Payment successful');
});

export default router;