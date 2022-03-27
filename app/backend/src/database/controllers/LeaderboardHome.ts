import { Request, Response } from 'express';

import MatchModel from '../models/MatchModel';
import ClubModel from '../models/ClubModel';

const LeaderboardHome = async (_req: Request, res: Response) => {
  const finishedMatchs = await MatchModel.findAll({
    where: { inProgress: false },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: ClubModel, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: ClubModel, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  res.status(200).json(finishedMatchs);
};

export default LeaderboardHome;
