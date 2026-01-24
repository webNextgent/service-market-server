import { Router } from "express";
import { AuthController, reSendOtpHandler, sendOtpHandler, verifyOtpHandler } from "./auth.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = Router();

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);
router.post('/resend-otp', reSendOtpHandler);

router.get("/users", auth("ADMIN","SUPER_ADMIN"), AuthController.AllUsers);
router.patch("/change-role/:id",auth("ADMIN","SUPER_ADMIN"), AuthController.changeRole);
router.delete("/delete-account/:id", auth("SUPER_ADMIN","ADMIN","USER"), AuthController.deleteAccount);

router.patch(
  "/update/profile",
  auth("SUPER_ADMIN","ADMIN", "USER"),
  AuthController.updateProfile,
);




export const AuthRoutes = router;
