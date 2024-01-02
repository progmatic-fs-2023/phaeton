import express from 'express';
import * as parkingController from '../controllers/parking.controller';

const router = express.Router();

router.get('/', parkingController.list);

router.get('/:id', parkingController.listById);

router.post('/date', parkingController.listByDate);

router.patch('/date/:id', parkingController.book);
export default router;
