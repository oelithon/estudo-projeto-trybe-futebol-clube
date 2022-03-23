import { Request, Response } from 'express';
import ClubModel from '../models/ClubModel';

export const getAllClubs = async (_req: Request, res: Response) => {
  const clubsList = await ClubModel.findAll();
  return res.status(200).json(clubsList);
};

export const getClubByid = async (req: Request, res: Response) => {
  const { id } = req.params;

  const club = await ClubModel.findByPk(id);

  return res.status(200).json(club);
};
