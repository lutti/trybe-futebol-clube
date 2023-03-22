import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

class TeamService {
  static async GetAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async GetById(id: number): Promise<ITeam | null> {
    const team = await Team.findByPk(id);
    return team;
  }
}

export default TeamService;
