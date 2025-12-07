import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, (req, res) => {
    res.json({ user: {...req.user} });
});

export default router;