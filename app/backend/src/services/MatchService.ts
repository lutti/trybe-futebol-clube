import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import CustomAppError from '../errors/CustomAppError';
import TeamService from './TeamService';

export default class MatchService {
  static async UpdateMatchById(match: IMatch): Promise<number> {
    const [updatedMatch] = await Match.update(
      {
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
      },
      { where: { id: match.id } },
    );
    return updatedMatch;
  }

  static async SaveBuildedMatch(partida: Match): Promise<Match> {
    // Checkar se os 2 times não são o mesmo
    if (partida.awayTeamId === partida.homeTeamId) {
      throw new CustomAppError('It is not possible to create a match with two equal teams', 422);
    }
    // Checkar se os 2 times tem id do time válido
    const homeTeam = await TeamService.GetById(partida.homeTeamId);
    const awayTeam = await TeamService.GetById(partida.awayTeamId);
    if (!awayTeam || !homeTeam) throw new CustomAppError('There is no team with such id!', 404);

    const match = await partida.save();
    return match;
  }

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
