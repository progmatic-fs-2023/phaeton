import express from 'express';
import * as userIdValidator from '../middlewares/userIdValidator.middleware';
import { cancelService, ReturnService, getServices } from '../controllers/admin.controller';

const router = express.Router();

router.patch('/return/:userID', userIdValidator.userIdValidatorInParams, ReturnService);

router.patch('/cancel/:userID', userIdValidator.userIdValidatorInParams, cancelService);

router.get('/services/:userID', userIdValidator.userIdValidatorInParams, getServices);
export default router;
