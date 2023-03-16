import 'express-async-errors';
import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', TeamController.GetAllTeams);
router.get('/:id', TeamController.GetById);

export default router;
