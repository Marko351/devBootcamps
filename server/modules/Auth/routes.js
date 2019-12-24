import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from './controller';
import { protectRoutes } from '../../middleware/auth';

const router = new Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current-user', protectRoutes, getCurrentUser);

export default router;
