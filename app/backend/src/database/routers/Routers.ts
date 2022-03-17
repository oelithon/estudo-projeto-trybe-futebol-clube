import * as express from 'express';

export default class Route {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/login')
      .get((req, res) => {
        res.status(200).json({ message: 'Tudo certo!' });
      })
      .post();
  }
}
