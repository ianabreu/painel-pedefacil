import { z } from "zod";

export const RegisterSchema = z.object({
  store_name: z.string().min(1, "O nome do estabelecimento é obrigatório"),
  user_name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("Insira um email válido").toLowerCase(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
