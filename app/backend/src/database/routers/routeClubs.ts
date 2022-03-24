import * as express from 'express';

import { getAllClubs, getClubByid } from '../controllers/ClubsController';

export default class Route {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/clubs/:id')
      .get(getClubByid);

    this.router
      .route('/clubs')
      .get(getAllClubs);
  }
}
