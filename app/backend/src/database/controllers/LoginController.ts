import { Request, Response } from 'express';
import { LoginInfo, UserInfo } from '../interfaces/User';
import UserModel from '../models/UserModel';

const Login = async (req: Request, res: Response) => {
  const { email }: LoginInfo = req.body;

  const userData = await UserModel.findOne({ where: { email } });
  const { id, username, role } = userData as UserInfo;

  res.status(200).json({ user: { id, username, role, email } });
};

export default Login;
