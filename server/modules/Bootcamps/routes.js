import { Router } from 'express';

import {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} from './controller';

const router = new Router();

router.get('/', getAllBootcamps);
router.get('/:bootcampId', getBootcamp);
router.post('/', createBootcamp);
router.patch('/:bootcampId', updateBootcamp);
router.delete('/:bootcampId', deleteBootcamp);

export default router;
