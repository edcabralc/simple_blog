import { postService } from "@services/post.service";
import { RequestHandler } from "express";

const postController: { [key: string]: RequestHandler } = {
  getAll: async (req, res) => {
    const post = await postService.getAll();
    res.status(200).json(post);
  },

  getById: (req, res) => {},

  create: (req, res) => {},

  update: (req, res) => {},

  delete: (req, res) => {},
};

export { postController };
