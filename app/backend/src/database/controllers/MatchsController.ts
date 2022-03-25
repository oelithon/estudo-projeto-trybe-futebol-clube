import { Request, Response } from 'express';
import MatchModel from '../models/MatchModel';
import ClubModel from '../models/ClubModel';
import NewMatch from '../interfaces/Match';

export const getAllMatchs = async (_req: Request, res: Response) => {
  const matchList = await MatchModel.findAll(
    {
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: ClubModel, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: ClubModel, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    },
  );
  return res.status(200).json(matchList);
};

export const createMatch = async (req: Request, res: Response) => {
  const newMatch = req.body as NewMatch;

  const matchCreated = await MatchModel.create(newMatch);

  return res.status(201).json(matchCreated);
};

export const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  await MatchModel.update(
    { inProgress: false },
    { where: { id } },
  );

  return res.status(200).json({ message: 'Finished Match!' });
};
