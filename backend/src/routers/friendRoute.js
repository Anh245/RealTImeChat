import express from "express";
import {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriend,
    getAllFriends,
    getAllRequests
} from "../controllers/friendController.js";

const router = express.Router();

router.post('/requests',sendFriendRequest);
router.post('/requests/:requestId/accept',acceptFriendRequest);
router.post('/requests/:requestId/decline',declineFriend);


router.get('/friends',getAllFriends);
router.get('/requests',getAllRequests);

export default router;