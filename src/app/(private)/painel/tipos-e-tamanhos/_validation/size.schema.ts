import { z } from "zod";

export const sizeSchema = z.object({
  description: z
    .string("A descrição deve ser um texto válido")
    .min(3, "A descrição deve ter pelo menos 3 caracteres")
    .max(30, "A descrição deve ter no máximo 30 caracteres"),

  acronym: z
    .string("A sigla deve ser um texto válido")
    .min(1, "A sigla deve ter pelo menos 1 caracter")
    .max(10, "A sigla deve ter no máximo 10 caracteres"),

  allowMixingFlavors: z.boolean(
    "Permitir mistura de sabores deve ser verdadeiro ou falso",
  ),

  sizeGroupId: z.uuid("Grupo de tamanhos deve ser um UUID válido"),
});

export type SizeFormData = z.infer<typeof sizeSchema>;
