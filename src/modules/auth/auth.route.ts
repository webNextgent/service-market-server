import { Router } from 'express';
import { AuthController, sendOtpHandler, verifyOtpHandler } from './auth.controller';

const router = Router();

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);

router.post('/register', AuthController.createUser)
router.post('/login', AuthController.loginUser)
router.post('/socialLogin', AuthController.loginUser)

export const AuthRoutes = router;
