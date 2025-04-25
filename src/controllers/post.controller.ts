import { postService } from "@services/post.service";
import { userService } from "@services/user.service";
import { coverToURL } from "@utils/cover-url";
import { createPostSlug } from "@utils/create-post-slug";
import { handleUplodCover } from "@utils/upload-cover";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";
import { postValidator } from "validators/post.validator";

const postController: { [key: string]: RequestHandler } = {
  getAll: async (req: ExtendedRequest, res) => {
    let page = 1;
    if (req.query.page) {
      page = parseInt(req.query.page as string);

      if (page <= 0) {
        res.status(404).json({ error: "Página não econtrada" });
        return;
      }
    }

    const postsToReturn = await postService.getAll(page);

    postsToReturn.map(post => ({
      id: post.id,
      status: post.status,
      title: post.status,
      createdAt: post.createdAt,
      cover: coverToURL(post.cover),
      authorName: post.author?.name,
      tags: post.tags,
      slug: post.slug,
    }));

    res.status(200).json({ posts: postsToReturn, page });
  },

  getById: async (req: ExtendedRequest, res) => {
    const { id } = req.params;
    console.log(id);

    const post = await postService.getById(id);
    console.log(post);

    if (!post) {
      res.status(404).json({ error: "Post não encontrado" });
      return;
    }

    res.status(200).json(post);
  },

  getBySlug: async (req: ExtendedRequest, res) => {
    const { slug } = req.params;

    console.log(slug);

    const post = await postService.getBySlug(slug);

    if (!post) {
      res.status(404).json({ error: "Post não encontrado" });
      return;
    }

    res.status(200).json(post);
  },

  create: async (req: ExtendedRequest, res) => {
    if (!req.user) {
      return;
    }

    const data = postValidator.create(req.body);

    if (!data.success) {
      res.status(400).json({ error: data.error.flatten().fieldErrors });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "Arquivo não enviado" });
      return;
    }

    const coverName = await handleUplodCover(req.file);

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
        slug: newPost.slug,
        title: newPost.title,
        createdAt: newPost.createdAt,
        cover: coverToURL(newPost.cover),
        tags: newPost.tags,
        authorName: author?.name,
      },
    });
  },

  update: async (req: ExtendedRequest, res) => {
    const { slug } = req.params;

    const data = postValidator.update(req.body);

    if (!data.success) {
      res.status(401).json({ error: data.error.flatten().fieldErrors });
      return;
    }

    const post = await postService.getBySlug(slug);

    if (!post) {
      res.status(404).json({ error: "Post não encontrado" });
      return;
    }

    let coverName: string | false = false;

    if (req.file) {
      coverName = await handleUplodCover(req.file);
    }

    const updatedPost = await postService.update(slug, {
      status: data.data.status ?? undefined,
      title: data.data.title ?? undefined,
      tags: data.data.tags ?? undefined,
      body: data.data.body ?? undefined,
      cover: coverName ? coverName : undefined,
    });

    const author = await userService.getUserById(updatedPost.authorId);

    res.status(202).json({
      post: {
        id: updatedPost.id,
        status: updatedPost.status,
        slug: updatedPost.slug,
        tags: updatedPost.tags,
        cover: coverToURL(updatedPost.cover),
        author: author?.name,
      },
    });
  },

  delete: async (req: ExtendedRequest, res) => {
    const { slug } = req.params;

    const post = await postService.getBySlug(slug);

    if (!post) {
      res.status(404).json({ error: "Post não encontrado" });
      return;
    }

    await postService.delete(post.slug);
    res.status(204).json({ error: null });
  },
};

export { postController };
