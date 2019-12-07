import { Router } from 'express';

import {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  createManyBootcamp,
  deleteAllBootcamps,
  getBootcampsInRadius
} from './controller';

const router = new Router();

router.get('/', getAllBootcamps);
router.get('/:bootcampId', getBootcamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius);
router.post('/', createBootcamp);
router.post('/many', createManyBootcamp);
router.patch('/:bootcampId', updateBootcamp);
router.delete('/all', deleteAllBootcamps);
router.delete('/:bootcampId', deleteBootcamp);

export default router;
