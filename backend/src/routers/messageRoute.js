import express from 'express';
import { sendDirectMessage, sendGroupMessage } from '../controllers/messageController';
import { checkFriendship } from '../middlewares/friendMidleware';

const router = express.Router();

router.post('/direct',checkFriendship,sendDirectMessage);
router.post('/group',sendGroupMessage);

export default router;