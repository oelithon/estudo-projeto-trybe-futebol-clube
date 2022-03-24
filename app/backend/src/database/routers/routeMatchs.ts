import * as express from 'express';
import { Request, Response } from 'express';

export default class RouteMatchs {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matchs')
      .get((_req: Request, res: Response) => {
        res.status(200).json({ message: 'rota /matchs ok' });
      });
  }
}
