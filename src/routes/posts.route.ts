import { postController } from "@controllers/post.controller";
import { upload } from "@libs/multer";
import { Router } from "express";
import { privateRoute } from "middlewares/private-route";

const postRoutes = Router();

postRoutes.get("/", privateRoute, postController.getAll);
postRoutes.get("/:slug", privateRoute, postController.getBySlug);
postRoutes.get("/:id", privateRoute, postController.getById);

postRoutes.post(
  "/",
  privateRoute,
  upload.single("cover"),
  postController.create
);

postRoutes.put(
  "/:slug",
  privateRoute,
  upload.single("cover"),
  postController.update
);

postRoutes.delete("/:slug", privateRoute, postController.delete);

export { postRoutes };
