import 'express-async-errors';
import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
// import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', LeaderboardController.GetMainLeaderboard);
router.get('/home', LeaderboardController.GetHomeLeaderboard);
router.get('/away', LeaderboardController.GetAwayLeaderboard);

export default router;
