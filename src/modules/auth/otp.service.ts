import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import { envVars } from "../../config/env";
import { sendWhatsappViaMYRC } from "../../utils/otpFunction";

const prisma = new PrismaClient();

const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const createAndSendOTP = async (phone: string) => {
  const otp = generateOTP();

  // OTP valid for 30 seconds
  const expiresAt = new Date(Date.now() + 30 * 1000);

  // ❌ Invalidate previous active OTPs
  await prisma.oTPLog.updateMany({
    where: {
      phone,
      expiresAt: {
        gt: new Date(),
      },
    },
    data: {
      status: "EXPIRED",
    },
  });

  const otpLog = await prisma.oTPLog.create({
    data: {
      phone,
      otp,
      status: "SENT",
      expiresAt,
      attempts: 0,
    },
  });

  // Auto delete after 60 sec
  setTimeout(async () => {
    try {
      await prisma.oTPLog.delete({
        where: { id: otpLog.id },
      });
    } catch (error) {
      // ignore
    }
  }, 60 * 1000);

  const message = `MPC Pest Control OTP: ${otp}
This code will expire in 30 seconds.`;

  await sendWhatsappViaMYRC(phone, message);

  return true;
};



// Send OTP
export const sendOTP = async ({ phone }: { phone: string }) => {
  await createAndSendOTP(phone);

  return {
    success: true,
    message: "OTP sent via WhatsApp",
  };
};


export const reSendOTP = async ({ phone }: { phone: string }) => {
  // ⏱️ Resend cooldown (optional but recommended)
  const lastOtp = await prisma.oTPLog.findFirst({
    where: {
      phone,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 15 * 1000) {
    return {
      success: false,
      message: "Please wait 15 seconds before resending OTP",
    };
  }

  await createAndSendOTP(phone);

  return {
    success: true,
    message: "OTP resent successfully",
  };
};



// Verify OTP
const verifyOTP = async ({ phone, otp }: { phone: string; otp: string }) => {
  const formatted = phone

  const record = await prisma.oTPLog.findFirst({
    where: { phone: formatted, otp },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { success: false, message: "Invalid OTP" };
  if (record.expiresAt < new Date())
    return { success: false, message: "OTP expired" };

  await prisma.oTPLog.delete({ where: { id: record.id } });

  let user = await prisma.user.findUnique({ where: { phone: formatted } });

  if (!user) {
    user = await prisma.user.create({
      data: { phone: formatted, isVerified: true, registeredViaOtp: true },
    });
  } else if (!user.isVerified) {
    user = await prisma.user.update({
      where: { phone: formatted },
      data: { isVerified: true },
    });
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: "7d" },
  );

  return { success: true, user, token };
};

export const otpService = { sendOTP, verifyOTP,reSendOTP };
