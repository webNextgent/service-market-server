import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const sendOTP = async (data: any) => {
  const newService = await prisma.service.create({
    data,
  });
  return newService;
};


export const ServicesService = {
  sendOTP
  
};
