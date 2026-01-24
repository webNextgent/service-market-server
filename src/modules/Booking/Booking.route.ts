import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { BookingController } from "./Booking.controller";

const router = Router();

router.post("/create", BookingController.createBooking);

router.get("/", auth("ADMIN","SUPER_ADMIN"), BookingController.getAllBooking);

router.get("/my-booking", auth("USER"), BookingController.getAllMYBooking);
router.get("/:id", auth("USER", "ADMIN","SUPER_ADMIN"), BookingController.getSingleBooking);
router.patch(
  "/update/:id",
  auth("USER", "ADMIN","SUPER_ADMIN"),
  BookingController.updateBooking,
);
router.patch(
  "/userBooking/:id",
  auth("USER", "ADMIN","SUPER_ADMIN"),
  BookingController.updateUserBooking,
);
router.delete(
  "/delete/:id",
  auth("USER", "ADMIN","SUPER_ADMIN"),
  BookingController.deleteBooking,
);

export const BookingsRoutes = router;
