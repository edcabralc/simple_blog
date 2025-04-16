import { adminController } from "@controllers/admin.controller";
import { Router } from "express";

const adminRoutes = Router();

adminRoutes.get("/posts", adminController.getAll);
// adminRoutes.post("/posts", adminController.create);
// adminRoutes.get("/posts/:slug", adminController.getById);
// adminRoutes.put("/posts/:slug", adminController.update);
// adminRoutes.delete("/posts/:slug", adminController.delete);

export { adminRoutes };
