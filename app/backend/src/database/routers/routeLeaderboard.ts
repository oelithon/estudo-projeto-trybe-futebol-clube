import * as express from 'express';

import LeaderboardHome from '../controllers/LeaderboardHome';

export default class RouteLeaderboard {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/leaderboard/home')
      .get(LeaderboardHome);
  }
}
