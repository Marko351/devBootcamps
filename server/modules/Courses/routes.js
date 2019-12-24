import { Router } from 'express';
import Courses from './model';
import advancedResults from '../../utils/advancedResults';
import { protectRoutes, authorize } from '../../middleware/auth';

import {
  getCourse,
  getCourses,
  createManyCourses,
  createCourse,
  updateCourse,
  deleteAllCourses,
  deleteCourse
} from './controller';

const router = new Router();

router.get(
  '/',
  advancedResults(Courses, {
    path: 'bootcamp'
  }),
  getCourses
);
router.get('/:bootcampId/courses', getCourses);
router.get('/:courseId', getCourse);
router.post(
  '/:bootcampId/courses',
  protectRoutes,
  authorize('publisher', 'admin'),
  createCourse
);
router.post('/many', createManyCourses);
router.patch(
  '/:courseId',
  protectRoutes,
  authorize('publisher', 'admin'),
  updateCourse
);
router.delete(
  '/all',
  protectRoutes,
  authorize('publisher', 'admin'),
  deleteAllCourses
);
router.delete(
  '/:courseId',
  protectRoutes,
  authorize('publisher', 'admin'),
  deleteCourse
);

export default router;
