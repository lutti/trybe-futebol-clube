import 'express-async-errors';
import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/', LoginController.TryToLogin);

export default router;
