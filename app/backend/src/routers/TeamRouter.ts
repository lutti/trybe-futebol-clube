import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', TeamController.GetAllTeams);

export default router;
