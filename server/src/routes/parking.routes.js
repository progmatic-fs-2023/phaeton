import express from 'express';
import * as parkingController from '../controllers/parking.controller.js';
const router = express.Router();

router.get('/', parkingController.list);

router.get('/:id', parkingController.listById);

router.get('/:id', parkingController.book);
export default router;
