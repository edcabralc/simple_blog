import { postController } from "@controllers/post.controller";
import { upload } from "@libs/multer";
import { Router } from "express";
import { privateRoute } from "middlewares/private-route";

const postRoutes = Router();

postRoutes.get("/", postController.getAll);

postRoutes.get("/:slug", postController.getById);

postRoutes.post(
  "/",
  privateRoute,
  upload.single("cover"),
  postController.create
);

postRoutes.put("/:slug", postController.update);

postRoutes.delete("/:slug", postController.delete);

export { postRoutes };
