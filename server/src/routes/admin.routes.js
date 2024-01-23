import express from 'express';
import * as userIdValidator from '../middlewares/userIdValidator.middleware';
import { endService, getServices } from '../controllers/admin.controller';

const router = express.Router();

router.patch('/cancel/:userID', userIdValidator.userIdValidatorInParams, endService);

router.get('/services/:userID', userIdValidator.userIdValidatorInParams, getServices);
export default router;
