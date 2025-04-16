import { nameValidator } from "validators/user.validator";
import z from "zod";

const useSchema = z.object({
  name: nameValidator,
  email: z.string().email("Email inválido"),
  password: z.string(),
});

export { useSchema };
