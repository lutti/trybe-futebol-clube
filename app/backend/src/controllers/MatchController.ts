import { Request, Response } from 'express';
import CustomAppError from '../errors/CustomAppError';
import Match from '../database/models/Match';
import MatchService from '../services/MatchService';
// import LoginService from '../services/LoginService';
// import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';
// import { CustomRequest } from '../middlewares/AuthMiddleware';

class MatchController {
  static async GetAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    let matches: Match[];
    if (!inProgress) {
      matches = await MatchService.GetAllMatches();
    } else if (inProgress === 'true') {
      matches = await MatchService.GetAllMatchesInProgress(true);
    } else if (inProgress === 'false') {
      matches = await MatchService.GetAllMatchesInProgress(false);
    } else {
      throw new CustomAppError('Query string invalida', 500);
    }
    res.status(200).json(matches);
  }

  static async FinishMatchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id || Number.isNaN(+id)) throw new CustomAppError('Invalid id or not a number', 500);

    const rowsUpdated = await MatchService.FinishMatchById(+id);
    if (rowsUpdated > 0) res.status(200).json({ message: 'Finished' });

    throw new CustomAppError('Match id not found', 500);
  }
}

export default MatchController;
