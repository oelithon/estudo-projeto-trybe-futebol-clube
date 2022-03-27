import * as express from 'express';

export default class RouteLeaderboard {
  public router: express.Router;

  constructor() {
    this.router
      .route('/leaderboard/home')
      .get();
  }
}
