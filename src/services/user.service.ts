import { prisma } from "@libs/prisma";
import bcrypt from "bcryptjs";
import { User } from "../../generated/prisma/client";

const userService = {
  getUserById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  },

  create: async ({
    name,
    email,
    password,
  }: Pick<User, "name" | "email" | "password">) => {
    email = email.toLocaleLowerCase();
    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      return false;
    }

    const hashPassword = bcrypt.hashSync(password);

    return await prisma.user.create({
      data: { name, email, password: hashPassword },
    });
  },

  verifyUser: async ({ email, password }: Pick<User, "email" | "password">) => {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return false;
    }

    return user;
  },
};

export { userService };
