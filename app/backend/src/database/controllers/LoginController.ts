import { Request, Response } from 'express';

const Login = (req: Request, res: Response) => res
  .status(200).json({ message: 'Login efetuado com sucesso.' });

export default Login;
