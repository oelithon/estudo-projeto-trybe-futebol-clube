import * as express from 'express';

import { getAllMatchs, createMatch, finishMatch } from '../controllers/MatchsController';

export default class RouteMatchs {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matchs/:id/finish')
      .patch(finishMatch);

    this.router
      .route('/matchs')
      .get(getAllMatchs)
      .post(createMatch);
  }
}
