import { authController } from "@controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/signin", authController.signin);
authRoutes.post("/validate", authController.validate);

export { authRoutes };
