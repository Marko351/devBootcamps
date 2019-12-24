import { Router } from 'express';

import { registerUser } from './controller';

const router = new Router();

router.post('/register', registerUser);

export default router;
