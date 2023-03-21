import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import Team from '../database/models/Team';

class LeaderboardController {
  static async GetHomeLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.GetHomeLeaderboard();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }

  static async GetAwayLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.GetAwayLeaderboard();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }

  static async GetMainLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.GetMainLeaderboard();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }
}

export default LeaderboardController;
