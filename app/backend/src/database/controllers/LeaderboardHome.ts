import { Request, Response } from 'express';

import MatchModel from '../models/MatchModel';
import ClubModel from '../models/ClubModel';

import { MatchClub } from '../interfaces/Match';
import Leaderboard from '../interfaces/Leaderboard';

const listAllMatches = async () => {
  const list = await MatchModel.findAll({
    where: { inProgress: false },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: ClubModel, as: 'homeClub', attributes: { exclude: ['id'] } },
    ],
  });

  return list;
};

const createLeaderboardHome = (clubName: string | undefined) => {
  const clubResultInMatches = {
    name: clubName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  return clubResultInMatches;
};

const setClubValues = (clubInMatches: MatchClub, statisticsClub: Leaderboard) => {
  const result = statisticsClub;
  if (clubInMatches.homeTeamGoals > clubInMatches.awayTeamGoals) {
    result.totalVictories += 1;
    result.totalPoints += 3;
  }

  if (clubInMatches.homeTeamGoals < clubInMatches.awayTeamGoals) {
    result.totalLosses += 1;
  }

  if (clubInMatches.homeTeamGoals === clubInMatches.awayTeamGoals) {
    result.totalPoints += 1;
    result.totalDraws += 1;
  }

  result.totalGames += 1;
  result.goalsFavor += clubInMatches.homeTeamGoals;
  result.goalsOwn += clubInMatches.awayTeamGoals;
  result.goalsBalance = result.goalsFavor - result.goalsOwn;

  result.efficiency = parseFloat(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));

  return result;
};

const listBestClubs = async () => {
  const homeClub: Leaderboard[] = []; // Array de Clubes.

  const allMatches = await listAllMatches();

  allMatches.map((match) => {
    const clubInMatches: MatchClub = match;

    const clubName = clubInMatches.homeClub?.clubName;

    let statisticsClub = createLeaderboardHome(clubName);

    const index = homeClub.findIndex((id) => id.name === clubName); // Compara os index e evita repetição de mais de um Clube.

    statisticsClub = setClubValues(clubInMatches, statisticsClub);

    if (index < 0) {
      homeClub.push(statisticsClub);
      return homeClub;
    }

    const club = homeClub[index];

    homeClub[index] = setClubValues(clubInMatches, club);

    return statisticsClub;
  });

  return homeClub;
};

const LeaderboardHome = async (_req: Request, res: Response) => {
  const bastClubs = await listBestClubs();

  res.status(200).json(bastClubs);
};

export default LeaderboardHome;
