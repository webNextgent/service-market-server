import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async (prisma: PrismaClient) => {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("superadmin123", 10);
      await prisma.user.create({
        data: {
          phone:"+8801826853371",
          role: "SUPER_ADMIN",
        },
      });
      console.log("Super Admin created!");
    } else {
      console.log("Super Admin already exists");
    }
  } catch (err) {
    console.error("Seed SuperAdmin error:", err);
  }
};
