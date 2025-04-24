import z from "zod";

const schemaPostCreate = z.object({
  title: z.string(),
  tag: z.string(),
  body: z.string(),
});

const schemaPostUpdate = z.object({
  status: z.enum(["PUBLISHED", "DRAFT"]).optional(),
  title: z.string().optional(),
  tags: z.string().optional(),
  body: z.string().optional(),
});

const postValidator = {
  create: (data: unknown) => schemaPostCreate.safeParse(data),
  update: (data: unknown) => schemaPostUpdate.safeParse(data),
};

export { postValidator };
