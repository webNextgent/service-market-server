import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingController } from "./Booking.controller";
import { BookingSchema } from "./Booking.validation";


const router = Router();

router.post(
  "/create",
// validateRequest(BookingSchema),
 BookingController.createBooking
);

router.get("/", auth("ADMIN"), BookingController.getAllBooking);
router.get("/", auth("USER"), BookingController.getAllMYBooking);
router.get("/:id", BookingController.getSingleBooking);
router.patch("/update/:id", BookingController.updateBooking); 
router.patch("/userBooking/:id", BookingController.updateUserBooking); 
router.delete("/delete/:id", BookingController.deleteBooking);

export const BookingsRoutes = router;
