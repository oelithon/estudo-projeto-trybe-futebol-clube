import * as express from 'express';
import * as cors from 'cors';

import RouteLogin from './database/routers/routeLogin';
import RouteClubs from './database/routers/routeClubs';
import RouteMatchs from './database/routers/routeMatchs';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());

    const path = '/';

    this.app.use(
      path,
      new RouteLogin().router,
      new RouteClubs().router,
      new RouteMatchs().router,
    );
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
