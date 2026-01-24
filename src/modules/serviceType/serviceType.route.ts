import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { ServiceTypeController } from "./serviceType.controller";

const router = Router();

router.post("/create", auth("ADMIN"), ServiceTypeController.createServiceType);

router.get("/", ServiceTypeController.getAllServiceType);
router.get(
  "/serviceType/dashboard",
  ServiceTypeController.getAllServiceTypeForDashboard,
);

router.get("/:id", ServiceTypeController.getSingleServiceType);
router.delete(
  "/delete/:id",
  auth("ADMIN"),
  ServiceTypeController.deleteServiceType,
);
router.patch(
  "/update/:id",
  auth("ADMIN"),
  ServiceTypeController.updateServiceType,
);

export const ServicesTypeRoutes = router;
