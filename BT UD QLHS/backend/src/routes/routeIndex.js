import express from 'express';
import studentRoutes from './studentRoutes.js';
const router = express.Router();

router.use('/students', studentRoutes);
export default router;