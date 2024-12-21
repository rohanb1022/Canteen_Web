import express from 'express';
import { createUser } from '../../controllers/test/createUser.js';

const router = express.Router();

// POST route to create a user (register)
router.post('/register', createUser);

export default router;
