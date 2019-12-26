import { Router } from 'express';
import { protectRoutes, authorize } from '../../middleware/auth';
import { updateUserDetails } from './controller';

console.log(protectRoutes, authorize);
const router = new Router();

router.put('/update-user-details', updateUserDetails);

export default router;
