import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  static async FinishMatchById(id: number): Promise<number> {
    const [updatedMatch] = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  }

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

  static async GetAllMatchesInProgress(value: boolean): Promise<Match[]> {
    const matches = await Match.findAll({
      where: { inProgress: value },
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
