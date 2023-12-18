import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import apiRouter from './routes/api.route';
import usersRouter from './routes/users.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api', apiRouter);

app.use('/users', usersRouter);

app.use(errorHandler);
export default app;
