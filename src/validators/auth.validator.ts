import z from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string(),
});

const signinSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});

const authValidador = {
  signup: (data: unknown) => signupSchema.safeParse(data),
  signin: (data: unknown) => signinSchema.safeParse(data),
};

export { authValidador };
