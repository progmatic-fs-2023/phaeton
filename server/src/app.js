import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import apiRouter from './routes/api.route.js';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api', apiRouter);

app.use('/users', usersRouter);

app.use(errorHandler);
export default app;
