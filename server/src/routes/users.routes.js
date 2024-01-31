import express from 'express';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/guestusersignup', authController.guestUserSignUp);
router.post('/login', authController.login);
router.post('/check', authController.check);
router.post('/services', authController.list);
router.delete('/delete', authController.deleteUser);
router.post('/forgot-password', authController.forgotPassword);
export default router;
