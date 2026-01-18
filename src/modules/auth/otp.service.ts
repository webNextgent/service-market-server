// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";
// import twilio from "twilio";
// import { envVars } from "../../config/env";

// const prisma = new PrismaClient();
// const client = twilio(envVars.TWILIO_ACCOUNT_SID, envVars.TWILIO_AUTH_TOKEN);

// // Helper
// function normalizePhone(phone: string) {
//   let p = phone.trim();
//   if (!p.startsWith("+")) p = "+" + p.replace(/^0+/, "");
//   return p;
// }

// // Send OTP
// const sendOTP = async ({ phone }: { phone: string }) => {
//   const formatted = normalizePhone(phone);
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//   await prisma.oTPLog.create({
//     data: {
//       phone: formatted,
//       otp,
//       status: "SENT",
//       expiresAt,
//       attempts: 0,
//     },
//   });

//   try {
//     const smsMessage = await client.messages.create({
//       to: formatted,
//       body: `Pest-Control Send Your OTP Phone sms: ${otp}. এটি 5 মিনিটের মধ্যে এক্সপায়ার হবে।`,
//       messagingServiceSid: envVars.TWILIO_MESSAGING_SERVICE_SID,
//     });

//     const whatsappMessage = await client.messages.create({
//       to: `whatsapp:${formatted}`,
//       from: `whatsapp:${envVars.TWILIO_PHONE_NUMBER}`,
//       body: `Pest-Control Send Your OTP Whatsapp: ${otp}. এটি 5 মিনিটের মধ্যে এক্সপায়ার হবে।`,
//     });

//     console.log(smsMessage);
//     console.log(whatsappMessage);
//     return {
//       success: true,
//       messages: [
//         { method: "sms", messageId: smsMessage.sid },
//         { method: "whatsapp", messageId: whatsappMessage.sid },
//       ],
//     };
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // Verify OTP
// const verifyOTP = async ({ phone, otp }: { phone: string; otp: string }) => {
//   const formatted = normalizePhone(phone);

//   // Find latest OTP
//   const record = await prisma.oTPLog.findFirst({
//     where: { phone: formatted, otp },
//     orderBy: { createdAt: "desc" },
//   });

//   if (!record) return { success: false, message: "Invalid OTP" };
//   if (record.expiresAt < new Date())
//     return { success: false, message: "OTP expired" };

//   // Mark OTP as VERIFIED
//   await prisma.oTPLog.delete({
//     where: { id: record.id },
//   });

//   // Find or create user
//   let user = await prisma.user.findUnique({ where: { phone: formatted } });
//   if (!user) {
//     user = await prisma.user.create({
//       data: { phone: formatted, isVerified: true, registeredViaOtp: true },
//     });
//   } else if (!user.isVerified) {
//     user = await prisma.user.update({
//       where: { phone: formatted },
//       data: { isVerified: true },
//     });
//   }

//   // Generate JWT
//   const token = jwt.sign(
//     { id: user.id, phone: user.phone, role: user.role },
//     envVars.JWT_ACCESS_SECRET,
//     { expiresIn: "7d" }
//   );

//   return { success: true, user, token };
// };

// export const otpService = { sendOTP, verifyOTP };
