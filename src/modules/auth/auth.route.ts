import { Router } from "express";
import { AuthController, reSendOtpHandler, sendOtpHandler, verifyOtpHandler } from "./auth.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = Router();

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);
router.post('/resend-otp', reSendOtpHandler);

// router.post("/register", AuthController.createUser);
// router.post("/login", AuthController.loginUser);
router.get("/users", auth("ADMIN"), AuthController.AllUsers);
// router.post("/socialLogin", AuthController.socialLogin);
router.patch("/change-role", auth("ADMIN"), AuthController.changeRole);
// router.patch(
//   "/update/profile",
//   auth("ADMIN", "USER"),
//   AuthController.updateProfile,
// );

// router.patch(
//   "/change-password",
//   auth("ADMIN", "USER"),
//   AuthController.changePassword,
// );




export const AuthRoutes = router;
