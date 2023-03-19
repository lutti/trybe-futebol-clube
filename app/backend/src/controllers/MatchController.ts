import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
// import LoginService from '../services/LoginService';
// import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';
// import { CustomRequest } from '../middlewares/AuthMiddleware';

class MatchController {
  static async GetAllMatches(req: Request, res: Response): Promise<void> {
    const matches = await MatchService.GetAllMatches();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(matches);
  }
}

export default MatchController;
