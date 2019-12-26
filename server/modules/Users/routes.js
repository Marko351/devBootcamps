import { Router } from 'express';
import { updateUserDetails, updateUserPassword } from './controller';
import { protectRoutes } from '../../middleware/auth';

const router = new Router();

router.patch('/update-user-details', protectRoutes, updateUserDetails);
router.patch('/update-user-password', protectRoutes, updateUserPassword);

export default router;
