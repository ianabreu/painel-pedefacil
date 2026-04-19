import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
  status: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
