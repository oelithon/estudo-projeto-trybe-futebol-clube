import * as express from 'express';
import { Request, Response } from 'express';

import { Login, LoginValidate } from '../controllers/LoginController';
import { getAllClubs, getClubByid } from '../controllers/ClubsController';

import { validateEmail, validatePassword } from '../middlewares/validateLogin';

export default class Route {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login/validate')
      .get(LoginValidate);

    this.router
      .route('/login')
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'ok' });
      })
      .post(validateEmail, validatePassword, Login);

    this.router
      .route('/clubs/:id')
      .get(getClubByid);

    this.router
      .route('/clubs')
      .get(getAllClubs);
  }
}
