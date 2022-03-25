import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import MatchModel from '../models/MatchModel';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export const validateIdMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const MatchById = await MatchModel.findByPk(id);

  if (MatchById === null) {
    return res.status(404).json({ message: 'Match is not found' });
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
