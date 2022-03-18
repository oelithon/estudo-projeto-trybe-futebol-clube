import * as express from 'express';
import Login from '../controllers/LoginController';

export default class Route {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login')
      .get()
      .post(Login);
  }
}
