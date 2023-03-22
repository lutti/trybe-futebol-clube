import { Request, Response } from 'express';
import CustomAppError from '../errors/CustomAppError';
import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';

class TeamController {
  static async GetAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.GetAll();
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json(teams);
  }

  static async GetById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id || Number.isNaN(+id)) {
      throw new CustomAppError('Invalid id or not a number', 500);
    }
    const team = await TeamService.GetById(+id);
    if (!team) {
      throw new CustomAppError('Team not found', 404);
    }
    // if (!team) res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  }
}

export default TeamController;
