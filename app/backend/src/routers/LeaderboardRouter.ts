import 'express-async-errors';
import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
// import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/home', LeaderboardController.GetHomeLeaderboard);

export default router;
