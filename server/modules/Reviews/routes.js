import { Router } from 'express';
import advancedResults from '../../utils/advancedResults';
import { protectRoutes, authorize } from '../../middleware/auth';
import Reviews from './model';

import { getReviews, getReview, createReview } from './controller';

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

export default router;
