import { PrismaClient } from "@prisma/client";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { envVars } from "../../config/env";
// import AppError from "../../helpers/AppError";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// const sendOTP = async (data: any) => {
//   const newService = await prisma.service.create({
//     data,
//   });
//   return newService;
// };

// // const verifyOTP = async ({ phone, otp }: { phone: string; otp: string }) => {
// //   const record = await prisma.oTPLog.findFirst({
// //     where: { phone, otp },
// //     orderBy: { createdAt: "desc" }, // latest OTP first
// //   });

// //   if (!record) return { success: false, message: "Invalid OTP" };
// //   if (record.expiresAt < new Date())
// //     return { success: false, message: "OTP expired" };

// //   // mark OTP as VERIFIED
// //   await prisma.oTPLog.update({
// //     where: { id: record.id },
// //     data: { status: "VERIFIED" },
// //   });

// //   // Find or create user
// //   let user = await prisma.user.findUnique({ where: { phone } });

// //   if (!user) {
// //     user = await prisma.user.create({
// //       data: {
// //         phone,
// //         isVerified: true,
// //         registeredViaOtp: true,
// //       },
// //     });
// //   } else if (!user.isVerified) {
// //     user = await prisma.user.update({
// //       where: { phone },
// //       data: { isVerified: true },
// //     });
// //   }

// //   // Generate JWT
// //   const token = jwt.sign(
// //     {
// //       id: user.id,
// //       phone: user.phone,
// //       role: user.role,
// //     },
// //     envVars.JWT_ACCESS_SECRET,
// //     { expiresIn: "7d" },
// //   );

// //   return { success: true, user, token };
// // };

// // export const otpService = { sendOTP, verifyOTP };

// export const ServicesService = {
//   sendOTP,
//   // verifyOTP,
// };

// const createUser = async (data: any) => {
//   const existing = await prisma.user.findFirst({
//     where: { email: data.email },
//   });

//   if (existing) {
//     throw new AppError(400, "Email already registered");
//   }

//   const hashedPassword = await bcrypt.hash(
//     data.password,
//     Number(envVars.BCRYPT_SALT_ROUND),
//   );

//   const user = await prisma.user.create({
//     data: {
//       ...data,
//       password: hashedPassword,
//     },
//   });

//   const { password, ...safeUser } = user;

//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     envVars.JWT_ACCESS_SECRET,
//     { expiresIn: "7d" },
//   );

//   return {
//     user: safeUser,
//     token,
//   };
// };

// const loginUser = async (data: { email: string; password: string }) => {
//   const user = await prisma.user.findFirst({
//     where: { email: data.email },
//   });

//   if (!user) {
//     throw new AppError(401, "User not found");
//   }

//   if (!user.password) {
//     throw new AppError(
//       401,
//       "This account does not have a password. Please login using social authentication.",
//     );
//   }

//   const valid = await bcrypt.compare(data.password, user.password);

//   if (!valid) {
//     throw new AppError(401, "Password does not match");
//   }

//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     envVars.JWT_ACCESS_SECRET,
//     { expiresIn: "7d" },
//   );

//   const { password, ...safeUser } = user;

//   return {
//     safeUser,
//     token,
//   };
// };

// const socialLogin = async (payload: any) => {
//   let user = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });

//   if (!user) {
//     user = await prisma.user.create({
//       data: {
//         email: payload.email,
//         name: payload.name,
//         provider: payload.provider,
//         password: null, // 🔑 no password
//         role: "USER",
//       },
//     });
//   }

//   // 🔥 BACKEND TOKEN
//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     envVars.JWT_ACCESS_SECRET,
//     { expiresIn: "7d" },
//   );

//   const { password, ...safeUser } = user;

//   return { token, safeUser };
// };

// const updateProfile = async (userId: string, payload: any) => {
//   const result = await prisma.user.update({
//     where: { id: userId },
//     data: {
//       ...(payload.name && { name: payload.name }),
//       ...(payload.photo && { photo: payload.photo }),
//     },
//   });

//   return result;
// };

const changeRole = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.role && { role: payload.role }),
    },
  });

  return result;
};

// const changePassword = async (userId: string, payload: any) => {
//   const { oldPassword, newPassword } = payload;

//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   // 🔒 Type guard
//   if (!user || !user.password) {
//     throw new AppError(400, "User password not found");
//   }

//   // ✅ Now TS error gone
//   const isMatch = await bcrypt.compare(oldPassword, user.password);

//   if (!isMatch) {
//     throw new AppError(400, "Old password is incorrect");
//   }

//   // Optional checks
//   if (oldPassword === newPassword) {
//     throw new AppError(400, "New password must be different");
//   }

//   if (newPassword.length < 6) {
//     throw new AppError(400, "Password must be at least 6 characters");
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 12);

//   const result = await prisma.user.update({
//     where: { id: userId },
//     data: {
//       password: hashedPassword,
//     },
//   });

//   return result;
// };


const AllUsers = async () => {
  const users = await prisma.user.findMany({});


  return users;
};


export const AuthService = {
//   createUser,
//   loginUser,
//   socialLogin,
//   updateProfile,
//   changePassword,
  AllUsers,
  changeRole,
};
