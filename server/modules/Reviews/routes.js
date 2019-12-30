import { Router } from 'express';
import advancedResults from '../../utils/advancedResults';
import { protectRoutes, authorize } from '../../middleware/auth';
import Reviews from './model';

import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} from './controller';

const router = new Router();

router.get(
  '/',
  advancedResults(Reviews, { path: 'bootcamp', select: 'name, description' }),
  getReviews
);
router.get('/:bootcampId/reviews', getReviews);
router.get('/:reviewId', getReview);
router.post(
  '/:bootcampId',
  protectRoutes,
  authorize('user', 'admin'),
  createReview
);
router.patch(
  '/:reviewId',
  protectRoutes,
  authorize('user', 'admin'),
  updateReview
);
router.delete(
  '/:reviewId',
  protectRoutes,
  authorize('user', 'admin'),
  deleteReview
);

export default router;
