import { authController } from "@controllers/auth.controller";
import { Router } from "express";
import { privateRoute } from "middlewares/private-route";

const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/signin", authController.signin);
authRoutes.post("/validate", privateRoute, authController.validate);

export { authRoutes };
