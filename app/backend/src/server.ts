import 'express-async-errors';
import { App } from './app';
import 'dotenv/config';
// import TeamRouter from './routers/TeamRouter';

const PORT = process.env.APP_PORT || 3001;

const app = new App();
// app.app.use('/teams', TeamRouter);

app.start(PORT);
