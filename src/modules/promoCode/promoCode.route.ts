import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { PromoCodeController } from "./promoCode.controller";


const router = Router();

router.post(
  "/create",
  PromoCodeController.createPromoCode
);


router.get("/", PromoCodeController.getAllPromoCode);

router.post(
  "/use-promo-code/:id",
  PromoCodeController.usePromoCodeByUser
);

router.delete("/delete/:id", PromoCodeController.deletePromoCode);

export const PromoCodeRoutes = router;
