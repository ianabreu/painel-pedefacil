import z from "zod";

export const sizeGroupSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
});

export type SizeGroupFormData = z.infer<typeof sizeGroupSchema>;
