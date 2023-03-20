import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import Team from '../database/models/Team';

class LeaderboardController {
  static async GetHomeLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.GetHomeLeaderboard();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }
}

export default LeaderboardController;
