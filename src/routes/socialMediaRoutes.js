import express from 'express';
import { getSocialMedia } from '../controllers/socialMediaController.js';

const router = express.Router();

// GET /disasters/:id/social-media
router.get('/:id/social-media', getSocialMedia);

export default router;
