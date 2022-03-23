import { Request, Response } from 'express';
import ClubModel from '../models/ClubModel';

const getAllClubs = async (_req: Request, res: Response) => {
  const clubsList = await ClubModel.findAll();

  return res.status(200).json(clubsList);
};

export default getAllClubs;
