import { adminRoutes } from "@routes/admin.routes";
import { authRoutes } from "@routes/auth.routes";
import { postRoutes } from "@routes/posts.route";
import { Router } from "express";

const mainRoutes = Router();

mainRoutes.get("/ping", (req, res) => {
  res.status(200).json({ pong: true });
});

mainRoutes.use("/admin", adminRoutes);
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/posts", postRoutes);

export { mainRoutes };
