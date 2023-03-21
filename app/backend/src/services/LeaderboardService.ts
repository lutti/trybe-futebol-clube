import { QueryTypes } from 'sequelize';
import ITeamLeaderboard from '../interfaces/ITeamLeaderboard';
import sequelize from '../database/models';

const leaderboardsHomeQuery = `
SELECT dt.team_name as name,
  SUM(dt.points_home_team) as totalPoints,
  CONVERT(COUNT(dt.id), CHAR) as totalGames,
  SUM(dt.victory_home_team)  as totalVictories,
  SUM(dt.draw_home_team)  as totalDraws,
  SUM(dt.lose_home_team)  as totalLosses,
  SUM(dt.home_team_goals)  as goalsFavor,
  SUM(dt.away_team_goals) as goalsOwn,
  SUM(dt.home_team_goals) - SUM(dt.away_team_goals) as goalsBalance,
  ROUND((SUM(dt.points_home_team) / (COUNT(dt.id) * 3)) * 100, 2) as efficiency
FROM 
(
  SELECT t.team_name, m.*,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 3
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS points_home_team,
  CASE 
    WHEN m.away_team_goals > m.home_team_goals then 3
    WHEN m.away_team_goals = m.home_team_goals then 1
    ELSE 0
  END AS points_away_team,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 1
    ELSE 0
  END AS victory_home_team,
  CASE 
    WHEN m.away_team_goals > m.home_team_goals then 1
    ELSE 0
  END AS victory_away_team,
  CASE 
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS draw_home_team,
  CASE 
    WHEN m.away_team_goals = m.home_team_goals then 1
    ELSE 0
  END AS draw_away_team,
  CASE 
    WHEN m.home_team_goals < m.away_team_goals then 1
    ELSE 0
  END AS lose_home_team,
  CASE 
    WHEN m.away_team_goals < m.home_team_goals then 1
    ELSE 0
  END AS lose_away_team
  FROM TRYBE_FUTEBOL_CLUBE.teams t 
  LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches m ON t.id = m.home_team_id    
  WHERE m.in_progress = FALSE
  ORDER BY t.team_name
) AS dt
GROUP BY dt.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC
`;

const leaderboardsAwayQuery = `
SELECT dt.team_name as name,
  SUM(dt.points_away_team) as totalPoints,
  CONVERT(COUNT(dt.id), CHAR) as totalGames,
  SUM(dt.victory_away_team)  as totalVictories,
  SUM(dt.draw_away_team)  as totalDraws,
  SUM(dt.lose_away_team)  as totalLosses,
  SUM(dt.away_team_goals)  as goalsFavor,
  SUM(dt.home_team_goals) as goalsOwn,
  SUM(dt.away_team_goals) - SUM(dt.home_team_goals) as goalsBalance,
  ROUND((SUM(dt.points_away_team) / (COUNT(dt.id) * 3)) * 100, 2) as efficiency
FROM 
(
  SELECT t.team_name, m.*,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 3
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS points_home_team,
  CASE 
    WHEN m.away_team_goals > m.home_team_goals then 3
    WHEN m.away_team_goals = m.home_team_goals then 1
    ELSE 0
  END AS points_away_team,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 1
    ELSE 0
  END AS victory_home_team,
  CASE 
    WHEN m.away_team_goals > m.home_team_goals then 1
    ELSE 0
  END AS victory_away_team,
  CASE 
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS draw_home_team,
  CASE 
    WHEN m.away_team_goals = m.home_team_goals then 1
    ELSE 0
  END AS draw_away_team,
  CASE 
    WHEN m.home_team_goals < m.away_team_goals then 1
    ELSE 0
  END AS lose_home_team,
  CASE 
    WHEN m.away_team_goals < m.home_team_goals then 1
    ELSE 0
  END AS lose_away_team
  FROM TRYBE_FUTEBOL_CLUBE.teams t 
  LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches m ON t.id = m.away_team_id    
  WHERE m.in_progress = FALSE
  ORDER BY t.team_name
) AS dt
GROUP BY dt.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC
`;

const leaderboardsMainQuery = `
SELECT
 dt.team_name as name,
  SUM(dt.points_team) as totalPoints,
  CONVERT(COUNT(dt.id), CHAR) as totalGames,
  SUM(dt.victory_team)  as totalVictories,
  SUM(dt.draw_team)  as totalDraws,
  SUM(dt.lose_team)  as totalLosses,
  SUM(dt.team_goals)  as goalsFavor,
  SUM(dt.enemy_goals) as goalsOwn,
  SUM(dt.team_goals) - SUM(dt.enemy_goals) as goalsBalance,
  ROUND((SUM(dt.points_team) / (COUNT(dt.id) * 3)) * 100, 2) as efficiency
FROM 
((SELECT t.team_name, m.*,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 3
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS points_team,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 1
    ELSE 0
  END AS victory_team,
  CASE 
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS draw_team,
  CASE 
    WHEN m.home_team_goals < m.away_team_goals then 1
    ELSE 0
  END AS lose_team,
  "HOME" AS tipo_associacao,
  m.home_team_goals AS team_goals,
  m.away_team_goals AS enemy_goals
FROM TRYBE_FUTEBOL_CLUBE.teams t 
LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches m ON t.id = m.home_team_id
WHERE m.in_progress = FALSE
ORDER BY t.team_name)
UNION ALL 
(SELECT t.team_name, m.*,
  CASE 
    WHEN m.home_team_goals < m.away_team_goals then 3
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS points_team,
  CASE 
    WHEN m.home_team_goals < m.away_team_goals then 1
    ELSE 0
  END AS victory_team,
  CASE 
    WHEN m.home_team_goals = m.away_team_goals then 1
    ELSE 0
  END AS draw_team,
  CASE 
    WHEN m.home_team_goals > m.away_team_goals then 1
    ELSE 0
  END AS lose_team,
  "AWAY" AS tipo_associacao,
  m.away_team_goals AS team_goals,
  m.home_team_goals AS enemy_goals
FROM TRYBE_FUTEBOL_CLUBE.teams t 
LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches m ON t.id = m.away_team_id
WHERE m.in_progress = FALSE
ORDER BY t.team_name)) AS dt
GROUP BY dt.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC
`;

export default class LeaderboardService {
  static async GetHomeLeaderboard(): Promise<ITeamLeaderboard[]> {
    const teams = sequelize.query<ITeamLeaderboard>(
      leaderboardsHomeQuery,
      { raw: true, type: QueryTypes.SELECT },
    );
    return teams;
  }

  static async GetAwayLeaderboard(): Promise<ITeamLeaderboard[]> {
    const teams = sequelize.query<ITeamLeaderboard>(
      leaderboardsAwayQuery,
      { raw: true, type: QueryTypes.SELECT },
    );
    return teams;
  }

  static async GetMainLeaderboard(): Promise<ITeamLeaderboard[]> {
    const teams = sequelize.query<ITeamLeaderboard>(
      leaderboardsMainQuery,
      { raw: true, type: QueryTypes.SELECT },
    );
    return teams;
  }
}
