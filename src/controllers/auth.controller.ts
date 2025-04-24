import { authService } from "@services/auth.service";
import { userService } from "@services/user.service";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";
import { authValidador } from "validators/auth.validator";

const authController: { [keys: string]: RequestHandler } = {
  signup: async (req, res) => {
    const singupParsed = authValidador.signup(req.body);

    if (!singupParsed.success) {
      res.status(400).json({ error: singupParsed.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = singupParsed.data;

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
    const signinParsed = authValidador.signin(req.body);

    if (!signinParsed.success) {
      res
        .status(400)
        .json({ error: signinParsed.error?.flatten().fieldErrors });
      return;
    }

    const user = await userService.verifyUser(signinParsed.data);

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
