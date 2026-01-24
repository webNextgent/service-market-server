import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { PromoCodeController } from "./promoCode.controller";

const router = Router();

router.post(
  "/create",
  auth("ADMIN"),

  PromoCodeController.createPromoCode,
);

router.get("/", auth("ADMIN"), PromoCodeController.getAllPromoCode);

router.post(
  "/use-promo-code/:id",
  auth("ADMIN", "USER"),
  PromoCodeController.usePromoCodeByUser,
);

router.delete(
  "/delete/:id",
  auth("ADMIN"),
  PromoCodeController.deletePromoCode,
);

export const PromoCodeRoutes = router;
