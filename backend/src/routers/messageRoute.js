import express from 'express';
import { sendDirectMessage, sendGrouptMessage } from '../controllers/messageController';

const router = express.Router();

router.post('/direct',sendDirectMessage);
router.post('/group',sendGrouptMessage);

export default router;