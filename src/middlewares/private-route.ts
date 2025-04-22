import { authService } from "@services/auth.service";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "types/extended-request";

const privateRoute = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await authService.verifyRequest(req);

  if (!user) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }

  req.user = user;

  next();
};

export { privateRoute };
