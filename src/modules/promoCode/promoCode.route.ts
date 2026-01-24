import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { PromoCodeController } from "./promoCode.controller";

const router = Router();

router.post(
  "/create",
auth("ADMIN","SUPER_ADMIN"),

  PromoCodeController.createPromoCode,
);

router.get("/", auth("ADMIN"), PromoCodeController.getAllPromoCode);

router.post(
  "/use-promo-code/:id",
  auth("USER", "ADMIN","SUPER_ADMIN"),
  PromoCodeController.usePromoCodeByUser,
);

router.delete(
  "/delete/:id",
  auth("ADMIN","SUPER_ADMIN"),
  PromoCodeController.deletePromoCode,
);

export const PromoCodeRoutes = router;
