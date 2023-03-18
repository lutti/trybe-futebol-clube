import 'express-async-errors';
import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', LoginFieldsMiddleware, LoginController.TryToLogin);
router.get('/role', AuthMiddleware, LoginController.GetUserRole);

export default router;
