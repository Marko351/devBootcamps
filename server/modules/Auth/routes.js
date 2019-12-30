import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  logout
} from './controller';
import { protectRoutes } from '../../middleware/auth';

const router = new Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.get('/current-user', protectRoutes, getCurrentUser);
router.patch('/reset-password/:resetToken', resetPassword);

export default router;
