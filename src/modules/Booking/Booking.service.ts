import { PrismaClient } from "@prisma/client";
import { sendWhatsappViaMYRC } from "../../utils/otpFunction";
import sendEmail from "../../utils/sendMail";
import { bookingConfirmationTemplate } from "../../utils/sendEmailTemplete";

const prisma = new PrismaClient();


const createBooking = async (data: any) => {
  const { propertyItemIds, ...bookingData } = data;

  const findUser = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!findUser) {
    throw new Error("User not found");
  }

  // Prepare formatted date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formattedDate = formatDate(data.date);
  const timeRange = data.time; 

  const booking = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        ...bookingData
      },
    });

    await tx.propertyItem.updateMany({
      where: {
        id: { in: propertyItemIds },
      },
      data: {
        bookingId: booking.id,
      },
    });

    return booking;
  });

  const emailTemplate = bookingConfirmationTemplate({
    customerName: `${findUser.firstName} ${findUser.lastName}`,
    serviceDate: formattedDate,
    serviceTime: timeRange,
    serviceAddress: data.address,
    serviceType: data.serviceName,
    serviceDetails: `${propertyItemIds.length} item(s)`, // You can customize this
    serviceCharges: data.serviceCharge,
    vatAmount: data.vat,
    totalAmount: data.totalPay,
  });

  await sendEmail({
    to: findUser.email!,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  });

  // 👉 3. WhatsApp message
  const message = `Hi ${findUser.firstName}, your booking for ${data.serviceName} has been confirmed.\nBooking ID: ${booking.id}\nDate: ${formattedDate}\nTime: ${timeRange}\nTotal: AED ${data.totalPay.toFixed(2)}`;

  await sendWhatsappViaMYRC(findUser.phone, message);

  // 👉 4. Return booking with items
  return await prisma.booking.findUnique({
    where: { id: booking.id },
    include: { propertyItems: true },
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
