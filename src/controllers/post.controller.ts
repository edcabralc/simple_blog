import { postService } from "@services/post.service";
import { userService } from "@services/user.service";
import { coverToURL } from "@utils/cover-url";
import { createPostSlug } from "@utils/create-post-slug";
import { handleUplodCover } from "@utils/upload-cover";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";
import { z } from "zod";

const postController: { [key: string]: RequestHandler } = {
  getAll: async (req, res) => {
    const post = await postService.getAll();
    res.status(200).json(post);
  },

  getById: (req, res) => {},

  create: async (req: ExtendedRequest, res) => {
    const schema = z.object({
      title: z.string(),
      tag: z.string(),
      body: z.string(),
    });

    if (!req.user) {
      return;
    }

    const data = schema.safeParse(req.body);

    if (!data.success) {
      res.status(500).json({ error: data.error.flatten().fieldErrors });
      return;
    }

    if (!req.file) {
      res.status(500).json({ error: "Arquivo não enviado" });
      return;
    }

    const coverName = await handleUplodCover(req.file);
    console.log(coverName);

    if (!coverName) {
      res.status(400).json({ error: "Imagem não permitida/enviada" });
      return;
    }

    const slug = await createPostSlug(data.data.title);

    const newPost = await postService.create({
      authorId: req.user.id,
      slug,
      title: data.data.title,
      tags: data.data.tag,
      body: data.data.body,
      cover: coverName,
    });

    const author = await userService.getUserById(newPost.authorId);

    res.status(201).json({
      post: {
        id: newPost.id,
        slug: newPost.id,
        title: newPost.title,
        createdAt: newPost.createdAt,
        cover: coverToURL(newPost.cover),
        tags: newPost.tags,
        authorName: author?.name,
      },
    });
  },

  update: (req, res) => {},

  delete: (req, res) => {},
};

export { postController };
