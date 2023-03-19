import 'express-async-errors';
import { Router } from 'express';
// import LoginController from '../controllers/LoginController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import MatchController from '../controllers/MatchController';

const router = Router();

router.get('/', MatchController.GetAllMatches);
router.patch('/:id/finish', AuthMiddleware, MatchController.FinishMatchById);
router.patch('/:id', AuthMiddleware, MatchController.UpdateMatchById);
router.post('/', AuthMiddleware, MatchController.CreateNewOngoingMatch);

export default router;
