import z from "zod";

export const sizeGroupSchema = z.object({
  name: z
    .string("O nome deve ser um texto válido")
    .trim()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres" })
    .refine((val) => val.length > 0, {
      message: "O nome não pode estar vazio",
    }),
});

export type SizeGroupFormData = z.infer<typeof sizeGroupSchema>;
