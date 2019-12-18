import { Router } from 'express';
import Courses from './model';
import advancedResults from '../../utils/advancedResults';

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
router.post('/:bootcampId/courses', createCourse);
router.post('/many', createManyCourses);
router.patch('/:courseId', updateCourse);
router.delete('/all', deleteAllCourses);
router.delete('/:courseId', deleteCourse);

export default router;
