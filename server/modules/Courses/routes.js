import { Router } from 'express';

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

router.get('/', getCourses);
router.get('/:bootcampId/courses', getCourses);
router.get('/:courseId', getCourse);
router.post('/', createCourse);
router.post('/many', createManyCourses);
router.patch('/:courseId', updateCourse);
router.delete('/all', deleteAllCourses);
router.delete('/:courseId', deleteCourse);

export default router;
