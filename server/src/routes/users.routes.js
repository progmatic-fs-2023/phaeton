import express from 'express';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/guestusersignup', authController.guestUserSignUp);
router.post('/login', authController.login);
router.post('/check', authController.check);
router.post('/services', authController.list);
router.post('/delete', authController.deleteUser);
router.patch('/activate/:email/:code', authController.activateAccount);
router.get('/userbyid/:id', authController.getUserById);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password', authController.resetPassword);

export default router;
