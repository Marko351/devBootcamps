import { Router } from 'express';
import Bootcamps from './model';
import advancedResults from '../../utils/advancedResults';
import { protectRoutes, authorize } from '../../middleware/auth';

import {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  createManyBootcamp,
  deleteAllBootcamps,
  getBootcampsInRadius,
  uploadPhoto
} from './controller';

const router = new Router();

router.get(
  '/',
  advancedResults(Bootcamps, { path: 'courses' }),
  getAllBootcamps
);
router.get('/:bootcampId', getBootcamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post(
  '/',
  protectRoutes,
  authorize('publisher', 'admin'),
  createBootcamp
);
router.post('/many', createManyBootcamp);
router.patch(
  '/:bootcampId',
  protectRoutes,
  authorize('publisher', 'admin'),
  updateBootcamp
);
router.patch(
  '/:bootcampId/photo',
  protectRoutes,
  authorize('publisher', 'admin'),
  uploadPhoto
);
router.delete('/all', protectRoutes, authorize('admin'), deleteAllBootcamps);
router.delete(
  '/:bootcampId',
  protectRoutes,
  authorize('publisher', 'admin'),
  deleteBootcamp
);

export default router;
