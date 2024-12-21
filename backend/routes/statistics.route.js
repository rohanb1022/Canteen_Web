import express from 'express';
import { getStatistics } from '../controllers/statistics.controller.js'; 
const router = express.Router();

// Route for fetching statistics
router.get('/statistics', getStatistics);

export default router;
