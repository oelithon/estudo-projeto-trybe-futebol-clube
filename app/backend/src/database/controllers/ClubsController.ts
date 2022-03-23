import { Request, Response } from 'express';

const getAllClubs = async (req: Request, res: Response) => res
  .status(200).json({ message: 'all clubs' });

export default getAllClubs;
