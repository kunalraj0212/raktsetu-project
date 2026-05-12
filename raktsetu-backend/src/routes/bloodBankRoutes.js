import { Router } from 'express';
import { searchBloodBanks, getStats } from '../controllers/bloodBankController.js';

const router = Router();

router.get('/search', searchBloodBanks);
router.get('/stats', getStats);

export default router;
