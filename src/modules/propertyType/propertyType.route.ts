import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { PropertyTypeController } from "./propertyType.controller";

const router = Router();

router.post(
  "/create",
  auth("ADMIN","SUPER_ADMIN"),
  PropertyTypeController.createPropertyType,
);

router.get("/", PropertyTypeController.getAllPropertyType);
router.delete(
  "/delete/:id",
  auth("ADMIN","SUPER_ADMIN"),
  PropertyTypeController.deletePropertyType,
);
router.patch(
  "/update/:id",
  auth("ADMIN","SUPER_ADMIN"),
  PropertyTypeController.updatePropertyType,
);

export const PropertyTypeRoutes = router;
