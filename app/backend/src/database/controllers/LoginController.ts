import { Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import Payload from '../interfaces/Token';
import { LoginInfo, UserInfo } from '../interfaces/User';
import UserModel from '../models/UserModel';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export const Login = async (req: Request, res: Response) => {
  const { email }: LoginInfo = req.body;

  const userData = await UserModel.findOne({ where: { email } });
  const { id, username, role } = userData as UserInfo;

  const token = jwt.sign({ username, role }, secret, { algorithm: 'HS256' });

  res.status(200).json({ user: { id, username, role, email }, token });
};

export const LoginValidate = (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const payload = jwt.verify(authorization, secret);

    const { role } = payload as Payload;

    return res.status(200).json(role);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
