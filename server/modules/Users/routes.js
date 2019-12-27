import { Router } from 'express';
import Users from './model';
import {
  updateUserDetails,
  updateUserPassword,
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser
} from './controller';
import { protectRoutes, authorize } from '../../middleware/auth';
import advancedResults from '../../utils/advancedResults';

const router = new Router();

router.get(
  '/',
  protectRoutes,
  authorize('admin'),
  advancedResults(Users),
  getUsers
);
router.get('/:userId', protectRoutes, authorize('admin'), getSingleUser);
router.post('/', protectRoutes, authorize('admin'), createUser);
router.patch('/:userId', protectRoutes, authorize('admin'), updateUser);
router.delete('/:userId', protectRoutes, authorize('admin'), deleteUser);
router.patch('/update-user-details', protectRoutes, updateUserDetails);
router.patch('/update-user-password', protectRoutes, updateUserPassword);

export default router;
