import { Request, Response } from 'express';

import MatchModel from '../models/MatchModel';
import ClubModel from '../models/ClubModel';

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

const LeaderboardHome = async (_req: Request, res: Response) => {
  const listMatches = await listAllMatches();

  res.status(200).json(listMatches);
};

export default LeaderboardHome;
