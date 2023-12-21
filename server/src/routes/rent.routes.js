import express from 'express';
import * as rentController from '../controllers/rent.controller';
import rentingValidator from '../middlewares/rentingValidator.middleware';

const router = express.Router();

router.get('/', rentController.list);
router.get('/:id', rentController.listById);
router.patch('/:id', rentingValidator, rentController.rent);

export default router;
