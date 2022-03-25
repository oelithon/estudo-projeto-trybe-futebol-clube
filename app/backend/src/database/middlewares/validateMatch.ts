import { NextFunction, Request, Response } from 'express';
import MatchModel from '../models/MatchModel';

const validateIdMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const MatchById = await MatchModel.findByPk(id);

  if (MatchById === null) {
    return res.status(404).json({ message: 'Match is not found' });
  }

  next();
};

export default validateIdMatch;
