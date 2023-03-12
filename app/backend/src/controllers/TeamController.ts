import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';

class TeamController {
  static async GetAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.GetAll();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }
}

export default TeamController;
