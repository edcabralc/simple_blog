import { postController } from "@controllers/post.controller";
import { Router } from "express";

const postRoutes = Router();

postRoutes.get("/", postController.getAll);
postRoutes.get("/:slug", postController.getById);
postRoutes.post("/:slug", postController.create);
postRoutes.put("/:slug", postController.update);
postRoutes.delete("/:slug", postController.delete);

export { postRoutes };
