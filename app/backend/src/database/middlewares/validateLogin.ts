import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

const failEmailOrPass = { message: 'Incorrect email or password' };
const fieldsFilled = { message: 'All fields must be filled' };

const schemaEmail = Joi.object({
  email: Joi.string().email().required(),
});

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) return res.status(401).json(fieldsFilled);

  const { error } = schemaEmail.validate({ email });

  if (error) {
    return res.status(401).json(failEmailOrPass);
  }

  const userEmail = await UserModel.findOne({ where: { email } });

  if (!userEmail) return res.status(401).json(failEmailOrPass);

  next();
};

const schemaPass = Joi.object({
  pass: Joi.string().min(7).required(),
});

export const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password: pass } = req.body;

  if (!pass) return res.status(401).json(fieldsFilled);

  const { error } = schemaPass.validate({ pass });

  if (error) {
    return res.status(401).json(failEmailOrPass);
  }

  const userData = await UserModel.findOne({ where: { email } });

  if (userData) {
    const matchPass = bcrypt.compareSync(pass, userData.password);
    if (!matchPass) return res.status(401).json(failEmailOrPass);
  }

  next();
};
