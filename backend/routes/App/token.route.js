import express from 'express';
import Token from '../../models/token.model.js';

const router = express.Router();

// Function to generate a random 4-character alphanumeric token
const generateRandomToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 4; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

// Route to generate and store a unique token
router.get('/generatetoken', async (req, res) => {
  try {
    let token;
    let exists = true;

    // Keep generating tokens until we find a unique one
    while (exists) {
      token = generateRandomToken();
      const existingToken = await Token.findOne({ token });
      if (!existingToken) exists = false;
    }

    // Save the token in the database
    const newToken = new Token({ token });
    await newToken.save();

    res.status(201).json({ message: 'Token generated successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
