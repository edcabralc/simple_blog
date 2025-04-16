import { prisma } from "@libs/prisma";
import bcrypt from "bcryptjs";
import { UserType } from "types/user.type";

const userService = {
  create: async ({ name, email, password }: UserType) => {
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

  verifyUser: async ({
    email,
    password,
  }: Pick<UserType, "email" | "password">) => {
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
