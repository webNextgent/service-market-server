import { PrismaClient } from "@prisma/client";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

// const createBooking = async (data: any) => {
//   const newBooking = await prisma.booking.create({
//     data,
//   });
//   return newBooking;
// };

const createBooking = async (data: any) => {
  const { propertyItemIds, ...bookingData } = data;

  return await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: bookingData,
    });

    await tx.propertyItem.updateMany({
      where: {
        id: { in: propertyItemIds },
      },
      data: {
        bookingId: booking.id,
      },
    });

    return await tx.booking.findUnique({
      where: { id: booking.id },
      include: { propertyItems: true },
    });
  });
};


const getAllBooking = async () => {
  const result = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      propertyItems: true,
    },
  });
  return result;
};

const getAllMYBooking = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  include:{
    propertyItems:true
  }
  });
  return result;
};

const getSingleBooking = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const DeleteBooking = async (id: string) => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateBooking = async (id: string, data: any) => {
  const result = await prisma.booking.update({
    where: { id },
    data: data,
  });

  return result;
};
const updateUserBooking = async (id: string, data: any) => {
  const result = await prisma.booking.update({
    where: { id },
    data: data,
  });

  return result;
};

export const BookingServices = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  DeleteBooking,
  updateBooking,
  updateUserBooking,
  getAllMYBooking,
};
