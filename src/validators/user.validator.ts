import z from "zod";

const nameValidator = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export { nameValidator };
