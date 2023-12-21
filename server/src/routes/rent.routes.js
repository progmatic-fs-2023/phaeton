import express from 'express';
import * as rentController from '../controllers/rent.controller';
import userIdValidator from '../middlewares/userIdValidator.middleware';

const router = express.Router();

router.get('/', rentController.list);
router.get('/:id', rentController.listById);
router.patch('/:id', userIdValidator, rentController.rent);

export default router;
