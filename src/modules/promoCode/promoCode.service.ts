import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

const createPromoCode = async (data: any) => {
  const result = await prisma.promoCode.create({
    data: {
      ...data,
    },
  });

  return result;
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

  return result;
};


export const PromoCodeService = {
  createPromoCode,
  getAllPromoCode,
  DeletePromoCode,
  
};
