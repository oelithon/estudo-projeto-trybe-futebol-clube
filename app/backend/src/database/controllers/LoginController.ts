import { Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { LoginInfo, UserInfo } from '../interfaces/User';
import UserModel from '../models/UserModel';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

const Login = async (req: Request, res: Response) => {
  const { email }: LoginInfo = req.body;

  const userData = await UserModel.findOne({ where: { email } });
  const { id, username, role } = userData as UserInfo;

  const token = jwt.sign({ username }, secret, { algorithm: 'HS256' });

  res.status(200).json({ user: { id, username, role, email }, token });
};

export default Login;
