import * as express from 'express';

import {
  getAllMatchs,
  createMatch,
  finishMatch,
  UpdateMatch } from '../controllers/MatchsController';

import {
  validateIdMatch,
  validateToken,
  validateCreateMatch,
  validateMatchInProgress } from '../middlewares/validateMatch';

export default class RouteMatchs {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router
      .route('/matchs/:id/finish')
      .patch(validateToken, validateIdMatch, finishMatch);

    this.router
      .route('/matchs/:id')
      .patch(validateToken, validateIdMatch, validateMatchInProgress, UpdateMatch);

    this.router
      .route('/matchs')
      .get(getAllMatchs)
      .post(validateToken, validateCreateMatch, createMatch);
  }
}
