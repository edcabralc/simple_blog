import { createJwt } from "@libs/jwt";
import { User } from "../../generated/prisma/client";

const authService = {
  validate: async () => {},

  createToken: (user: User) => {
    return createJwt({ id: user.id });
  },
};

export { authService };
