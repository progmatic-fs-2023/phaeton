import express from 'express';
import * as userIdValidator from '../middlewares/userIdValidator.middleware'
import endService from '../controllers/cancel.controller';

const router = express.Router();

router.patch('/cancel/:userID', userIdValidator.userIdValidatorInParams, endService);

export default router