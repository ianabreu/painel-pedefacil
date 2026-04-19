import z from "zod";

export const variationSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
});

export type VariationFormData = z.infer<typeof variationSchema>;
