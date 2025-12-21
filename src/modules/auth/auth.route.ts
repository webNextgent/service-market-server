import { Router } from 'express';
import {
  sendOtpHandler,
 
} from './auth.controller';

const router = Router();

router.post('/send-otp', sendOtpHandler);



export const AuthRoutes = router;