import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import { envVars } from "../../config/env";
import { sendWhatsappViaMYRC } from "../../utils/otpFunction";

const prisma = new PrismaClient();

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/^0+/, "880");
}

// Send OTP
const sendOTP = async ({ phone }: { phone: string }) => {
  const formatted = normalizePhone(phone);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.oTPLog.create({
    data: {
      phone: formatted,
      otp,
      status: "SENT",
      expiresAt,
      attempts: 0,
    },
  });

  const message = `MPC Pest Control OTP: ${otp}
This code will expire in 5 minutes.`;

  await sendWhatsappViaMYRC(formatted, message);

  return {
    success: true,
    message: "OTP sent via WhatsApp",
  };
};

// Verify OTP
const verifyOTP = async ({ phone, otp }: { phone: string; otp: string }) => {
  const formatted = normalizePhone(phone);

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

export const otpService = { sendOTP, verifyOTP };
