import Team from '../database/models/Team';

class TeamService {
  static async GetAll(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async GetById(id: number): Promise<Team | null> {
    const team = await Team.findByPk(id);
    return team;
  }
}

export default TeamService;
