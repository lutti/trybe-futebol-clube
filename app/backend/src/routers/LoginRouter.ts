import 'express-async-errors';
import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';

const router = Router();

router.post('/', LoginFieldsMiddleware, LoginController.TryToLogin);

export default router;
