import express from 'express';
import * as rentController from '../controllers/rent.controller';
import * as userIdValidator from '../middlewares/userIdValidator.middleware'

const router = express.Router();

router.get('/', rentController.list);
router.get('/date', rentController.listByDate);
router.get('/:id', rentController.listById);
router.patch('/date/:id', userIdValidator.userIdValidatorInBody, rentController.rent);

export default router;
