import express from 'express';
import {verifyToken} from '../middleware/auth.js';

import { getPosts, getUserPosts, AddDeleteLike } from '../controllers/post.js';
const router = express.Router();

router.get('/:id', verifyToken, getUserPosts);
router.get('/', verifyToken, getPosts);
//router.get('/:id/posts', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, AddDeleteLike);


export default router;