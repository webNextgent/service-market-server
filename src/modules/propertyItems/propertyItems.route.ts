import { Router } from "express";
import { PropertyItemsController } from "./propertyItems.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/create",
  auth("ADMIN"),

  PropertyItemsController.createPropertyItems,
);

router.get("/", PropertyItemsController.getAllPropertyItems);
router.get("/:id", PropertyItemsController.getSinglePropertyItems);
router.delete(
  "/delete/:id",
  auth("ADMIN"),
  PropertyItemsController.deletePropertyItems,
);
router.patch(
  "/update/:id",
  auth("ADMIN"),
  PropertyItemsController.updatePropertyItems,
);

export const PropertyItemsRoutes = router;
