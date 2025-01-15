import express from 'express';

const router = express.Router();

router.post('/payment', (req, res) => {
    // Handle the payment logic here
    res.send('Payment successful');
});

export default router;