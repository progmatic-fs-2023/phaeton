import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import usersRouter from './routes/users.routes';
import rentController from './routes/rent.routes';
import parkingRouter from './routes/parking.routes';
import adminController from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/users', usersRouter);

app.use('/rental', rentController);

app.use('/parking', parkingRouter);

app.use('/admin', adminController);

app.use(errorHandler);
export default app;
