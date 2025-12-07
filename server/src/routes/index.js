import express from 'express';
import authRoutes from './authRoutes.js';
import chapterRoutes from './chapterRoutes.js';
import { authenticate } from '../middleware/authenticate.js';
import { getUser, getUserProgress, updateUser } from '../controllers/userController.js';
import { markProblemComplete } from '../controllers/chapterController.js';
const router = express.Router();

router.use('/auth', authRoutes);

router.get('/getUser', authenticate, getUser);
router.patch('/updateUser', authenticate, updateUser);
router.get('/user/progress', authenticate, getUserProgress);

router.use('/chapters', authenticate, chapterRoutes);
router.patch('/problems/:problemId/complete', authenticate, markProblemComplete);

export default router;