import z from "zod";

export const sizeSchema = z.object({
  description: z.string().min(3, "Mínimo de 3 caracteres"),
  acronym: z.string().min(1, "Mínimo de 1 caracter"),
  allowMixingFlavors: z.boolean(),
  sizeGroupId: z.uuid(),
});

export type SizeFormData = z.infer<typeof sizeSchema>;
