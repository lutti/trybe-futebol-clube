import Team from '../database/models/Team';

class TeamService {
  static async GetAll(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }
}

export default TeamService;
