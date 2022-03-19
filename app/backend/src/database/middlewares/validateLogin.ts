import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import UserModel from '../models/UserModel';

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) return res.status(401).json({ message: 'All fields must be filled' });

  const { error } = schema.validate({ email });

  if (error) {
    console.log(error);
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const userEmail = await UserModel.findOne({ where: { email } });

  if (!userEmail) return res.status(401).json({ message: 'Incorrect email or password' });

  next();
};

export default validateEmail;
