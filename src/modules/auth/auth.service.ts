import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateProfile = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.firstName && { firstName: payload.firstName }),
      ...(payload.lastName && { lastName: payload.lastName }),
      ...(payload.email && { email: payload.email }),
      ...(payload.phone && { phone: payload.phone }),
    },
  });

  return result;
};

const deleteAccount = async (userId: string) => {
  const result = await prisma.user.delete({
    where: { id: userId },
  });

  return result;
};

const changeRole = async (userId: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newRole = user.role === "USER" ? "ADMIN" : "USER";
  const result = await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  return result;
};

const AllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

export const AuthService = {
  updateProfile,
  deleteAccount,
  AllUsers,
  changeRole,
};
