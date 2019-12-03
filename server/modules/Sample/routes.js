import { Router } from 'express';

import { sampleRoute } from './controller';

const router = new Router();

router.get('/', sampleRoute);

export default router;
