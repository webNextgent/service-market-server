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

router.get("/", BookingController.getAllBooking);
router.get("/my-booking", auth("USER"), BookingController.getAllMYBooking);
router.get("/:id", auth("USER","ADMIN"), BookingController.getSingleBooking);
router.patch("/update/:id",auth("USER","ADMIN"), BookingController.updateBooking); 
router.patch("/userBooking/:id",auth("USER","ADMIN"), BookingController.updateUserBooking); 
router.delete("/delete/:id",auth("USER","ADMIN"), BookingController.deleteBooking);

export const BookingsRoutes = router;
