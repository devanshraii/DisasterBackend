import express from 'express';
import { verifyImage } from '../controllers/verificationController.js';

const router = express.Router();

// POST /disasters/:id/verify-image
router.post('/:id/verify-image', verifyImage);

export default router;
