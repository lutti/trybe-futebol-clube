import 'express-async-errors';
import * as express from 'express';
import TeamRouter from './routers/TeamRouter';
import LoginRouter from './routers/LoginRouter';
import MatchRouter from './routers/MatchRouter';
import LeaderboardRouter from './routers/LeaderboardRouter';
import ErrorMidleware from './middlewares/ErrorMidleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/matches', MatchRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/login', LoginRouter);
    this.app.use('/leaderboard', LeaderboardRouter);
    this.app.use(ErrorMidleware);
    // this.app.get('/teams', (req, res) => res.json({ funcionando: 'ta' }));
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
