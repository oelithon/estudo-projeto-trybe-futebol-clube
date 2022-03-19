import * as express from 'express';
import { Request, Response } from 'express';
import Login from '../controllers/LoginController';

import { validateEmail, validatePassword } from '../middlewares/validateLogin';

export default class Route {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login')
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'ok' });
      })
      .post(validateEmail, validatePassword, Login);
  }
}
