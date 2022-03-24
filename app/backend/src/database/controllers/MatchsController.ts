import { Request, Response } from 'express';
import MatchModel from '../models/MatchModel';
import ClubModel from '../models/ClubModel';

const getAllMatchs = async (_req: Request, res: Response) => {
  const matchList = await MatchModel.findAll(
    {
      include: [
        { model: ClubModel, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: ClubModel, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    },
  );
  return res.status(200).json(matchList);
};

export default getAllMatchs;
