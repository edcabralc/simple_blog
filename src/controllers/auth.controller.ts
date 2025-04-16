import { authService } from "@services/auth.services";
import { userService } from "@services/user.services";
import { RequestHandler } from "express";
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

    const newUser = await userService.create(data.data);

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
    console.log(data);

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

  validate: (req, res) => {},
};

export { authController };
