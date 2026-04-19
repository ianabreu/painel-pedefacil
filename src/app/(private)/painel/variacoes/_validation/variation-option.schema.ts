import z from "zod";

export const variationOptionSchema = z.object({
  description: z.string().min(3, "Mínimo de 3 caracteres"),
  acronym: z.string().min(1, "Mínimo de 1 caracter"),
  allowMixingFlavors: z.boolean(),
  variationTypeId: z.uuid(),
});

export type VariationOptionFormData = z.infer<typeof variationOptionSchema>;
