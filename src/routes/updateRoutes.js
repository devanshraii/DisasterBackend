import express from 'express';
import { getOfficialUpdates } from '../controllers/updateController.js';

const router = express.Router();

// GET /disasters/:id/official-updates
router.get('/:id/official-updates', getOfficialUpdates);

export default router;
