import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import MatchModel from '../models/MatchModel';
import NewMatch from '../interfaces/Match';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export const validateIdMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const MatchById = await MatchModel.findByPk(id);

  if (MatchById === null) {
    return res.status(404).json({ message: 'Match is not found' });
  }

  next();
};

export const validateMatchInProgress = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const MatchById = await MatchModel.findByPk(id);
  const { inProgress } = MatchById as NewMatch;

  if (inProgress === false) {
    res.status(401).json({ message: 'match is already finished' });
  }
  next();
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(authorization, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

export const validateCreateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body as NewMatch;
  const messageTwoEqualTeams = {
    message: 'It is not possible to create a match with two equal teams',
  };
  const messageNotTeam = { message: 'There is no team with such id!' };

  const seachHomeTeam = await MatchModel.findByPk(homeTeam);
  const seachAwayTeam = await MatchModel.findByPk(awayTeam);

  if (homeTeam === awayTeam) {
    return res.status(401).json(messageTwoEqualTeams);
  }
  if (!seachHomeTeam) {
    return res.status(401).json(messageNotTeam);
  }
  if (!seachAwayTeam) {
    return res.status(401).json(messageNotTeam);
  }
  next();
};
