import { prisma } from "@libs/prisma";
import { PostType } from "types/post.type";
import { Prisma } from "../../generated/prisma/client";

const postService = {
  getAll: async (page: number) => {
    if (page <= 0) {
      return [];
    }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      skip: (page - 1) * 5,
    });

    return posts;
  },

  getById: async (postId: string) =>
    await prisma.post.findMany({ where: { id: postId } }),

  getBySlug: async (slug: string) =>
    await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true },
        },
      },
    }),

  create: async (post: PostType) => await prisma.post.create({ data: post }),

  update: async (slug: string, post: Prisma.PostUpdateInput) =>
    await prisma.post.update({ where: { slug }, data: post }),

  delete: async (slug: string) => await prisma.post.delete({ where: { slug } }),
};

export { postService };
