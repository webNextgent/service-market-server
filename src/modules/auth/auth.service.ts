import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const prisma = new PrismaClient();

const sendOTP = async (data: any) => {
  const newService = await prisma.service.create({
    data,
  });
  return newService;
};

const verifyOTP = async ({ phone, otp }: { phone: string; otp: string }) => {
  const record = await prisma.oTPLog.findFirst({
    where: { phone, otp },
    orderBy: { createdAt: "desc" }, // latest OTP first
  });

  if (!record) return { success: false, message: "Invalid OTP" };
  if (record.expiresAt < new Date())
    return { success: false, message: "OTP expired" };

  // mark OTP as VERIFIED
  await prisma.oTPLog.update({
    where: { id: record.id },
    data: { status: "VERIFIED" },
  });

  // Find or create user
  let user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        isVerified: true,
        registeredViaOtp: true,
      },
    });
  } else if (!user.isVerified) {
    user = await prisma.user.update({
      where: { phone },
      data: { isVerified: true },
    });
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      role: user.role,
    },
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );

  return { success: true, user, token };
};

export const otpService = { sendOTP, verifyOTP };

export const ServicesService = {
  sendOTP,
  verifyOTP,
};
