import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const updateProfile = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.firstName && { firstName: payload.firstName }),
      ...(payload.lastName && { photo: payload.lastName }),
      ...(payload.email && { photo: payload.email }),
      ...(payload.phone && { photo: payload.phone }),
    },
  });

  return result;
};

const deleteAccount = async (userId: string,) => {
  const result = await prisma.user.delete({
    where: { id: userId },
   
  });

  return result;
};

const changeRole = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.role && { role: payload.role }),
    },
  });

  return result;
};



const AllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });
  return users;
};


export const AuthService = {
//   createUser,
//   loginUser,
//   socialLogin,
  updateProfile,
  deleteAccount,
  AllUsers,
  changeRole,
};
