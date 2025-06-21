import express from 'express';
import * as disasterController from '../controllers/disasterController.js';

const router = express.Router();

router.post('/', disasterController.createDisaster);
router.get('/', disasterController.getDisasters);
router.put('/:id', disasterController.updateDisaster);
router.delete('/:id', disasterController.deleteDisaster);

export default router;
