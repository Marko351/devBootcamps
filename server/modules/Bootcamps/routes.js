import { Router } from 'express';
import Bootcamps from './model';
import advancedResults from '../../utils/advancedResults';

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
router.post('/', createBootcamp);
router.post('/many', createManyBootcamp);
router.patch('/:bootcampId', updateBootcamp);
router.patch('/:bootcampId/photo', uploadPhoto);
router.delete('/all', deleteAllBootcamps);
router.delete('/:bootcampId', deleteBootcamp);

export default router;
