import { prisma } from "@libs/prisma";
import { PostType } from "types/post.type";

const postService = {
  getAll: async () => await prisma.post.findMany(),

  getPostBySlug: async (slug: string) =>
    await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true },
        },
      },
    }),

  create: async (post: PostType) => await prisma.post.create({ data: post }),

  update: async () => {},

  delete: async () => {},
};

export { postService };
