import express from 'express';
import * as parkingController from '../controllers/parking.controller';

const router = express.Router();

router.get('/', parkingController.list);

router.get('/:id', parkingController.listById);

router.get('/date', parkingController.listByDate);

router.post('/date/:id', parkingController.book);
export default router;
