import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { ServiceController } from "./service.controller";

const router = Router();

router.post("/create", auth("ADMIN","SUPER_ADMIN"), ServiceController.createService);

router.get("/", ServiceController.getAllService);
router.get("/:id", ServiceController.getSingleService);
router.delete("/delete/:id", auth("ADMIN","SUPER_ADMIN"), ServiceController.deleteService);
router.patch("/update/:id", auth("ADMIN","SUPER_ADMIN"), ServiceController.updateService);

export const ServicesRoutes = router;
