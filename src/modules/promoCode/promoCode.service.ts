import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createPromoCode = async (data: any) => {
  const result = await prisma.promoCode.create({
    data: {
      ...data,
    },
  });

  return result;
};

const usePromoCodeByUser = async (id: string, data: any) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const promo = await prisma.promoCode.findFirst({
    where: { code: data.code },
  });

  if (!promo) {
    throw new Error("Invalid promo code");
  }

  const today = new Date();
  const expiry = new Date(promo.expiryDate);

  if (expiry < today) {
    throw new Error("Promo code expired");
  }

  const alreadyUsed = await prisma.usePromoCode.findFirst({
    where: {
      userId: id,
      code: data.code,
    },
  });

  if (alreadyUsed) {
    throw new Error("Promo code already used");
  }
  const useCode = await prisma.usePromoCode.create({
    data: {
      userId: id,
      code: data.code,
      alreadyUse: true,
      discount: promo.discount,
    },
  });

  return useCode;
};

const getAllPromoCode = async () => {
  const result = await prisma.promoCode.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return result;
};

const DeletePromoCode = async (id: string) => {
  const result = await prisma.promoCode.delete({
    where: { id },
  });

  await prisma.usePromoCode.deleteMany({
    where: {
      code: result.code,
    },
  });

  return result;
};


export const PromoCodeService = {
  createPromoCode,
  getAllPromoCode,
  DeletePromoCode,
  usePromoCodeByUser,
};
