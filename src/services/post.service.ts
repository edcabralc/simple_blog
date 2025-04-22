import { prisma } from "@libs/prisma";

const postService = {
  getAll: async () => {
    const post = prisma.post.findMany();
    return post;
  },
  getById: async () => {},
  create: async () => {},
  update: async () => {},
  delete: async () => {},
};

export { postService };
