import { authService } from "@services/auth.service";
import { userService } from "@services/user.service";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";
import { z } from "zod";

const authController: { [keys: string]: RequestHandler } = {
  signup: async (req, res) => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const data = schema.safeParse(req.body);

    if (!data.success) {
      res.status(400).json({ error: data.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = data.data;

    const newUser = await userService.create({ name, email, password });

    if (!newUser) {
      res.status(400).json({ error: "Erro ao criar usuário" });
      return;
    }

    const token = authService.createToken(newUser);

    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  },

  signin: async (req, res) => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const data = schema.safeParse(req.body);

    if (!data.success) {
      res.status(400).json({ error: data.error?.flatten().fieldErrors });
      return;
    }

    const user = await userService.verifyUser(data.data);

    if (!user) {
      res.status(401).json({ error: "Acesso negado" });
      return;
    }

    const token = authService.createToken(user);

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  },

  validate: (req: ExtendedRequest, res) => {
    res.json({ user: req.user });
  },
};

export { authController };
