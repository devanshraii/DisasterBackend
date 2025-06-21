import express from 'express';
import { getResources } from '../controllers/resourceController.js';

const router = express.Router();

// GET /disasters/:id/resources?lat=...&lon=...
router.get('/disasters/:id/resources', getResources);

export default router;
