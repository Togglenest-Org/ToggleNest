import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// A simple protected route to test our middleware
router.get('/me', protect, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', userId: req.user });
});

export default router;