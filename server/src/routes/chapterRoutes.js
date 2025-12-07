import express from 'express';
import { getChapterById, getChapterProblems, getChapters } from '../controllers/chapterController.js';
const router = express.Router();

router.get('/', getChapters);
router.get('/:chapterId/problems', getChapterProblems);
router.get('/:chapterId', getChapterById);

export default router;