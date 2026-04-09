import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.email("Insira um email válido").toLowerCase(),
  password: z
    .string({ error: "A senha é obrigatória" })
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha deve conter pelo menos um caractere especial",
    ),
  user_name: z
    .string("Digite um nome para continuar")
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  store_name: z
    .string("Nome do estabelecimento é obrigatório")
    .min(3, "O nome do estabelecimento deve ter no mínimo 3 caracteres")
    .max(100, "O nome do estabelecimento deve ter no máximo 100 caracteres"),
});
