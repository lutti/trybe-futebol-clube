import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  static async GetAllMatches(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }
}
