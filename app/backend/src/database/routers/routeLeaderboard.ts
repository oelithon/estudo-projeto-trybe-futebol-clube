import * as express from 'express';
import { Request, Response } from 'express';

export default class RouteLeaderboard {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/leaderboard/home')
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'tudo certo' });
      });
  }
}
