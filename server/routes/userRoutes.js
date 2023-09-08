import express from 'express';
import {verifyToken} from '../middleware/auth.js';
import { get } from 'mongoose';
import { getUser, getFriends, AddDeleteFriend } from '../controllers/user.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getFriends);

router.patch('/:id/:friendId', verifyToken, AddDeleteFriend);

export default router;