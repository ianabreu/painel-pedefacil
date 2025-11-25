import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Insira um email válido").toLowerCase(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
