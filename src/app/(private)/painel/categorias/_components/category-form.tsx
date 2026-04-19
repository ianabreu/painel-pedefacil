"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  CategoryFormData,
  categorySchema,
} from "../_validation/category.schema";

interface CategoryFormProps {
  defaultValues?: CategoryFormData;
  onSubmit: (categoryFormData: CategoryFormData) => Promise<void>;
  submitText?: string;
  cancelText?: string;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  submitText = "Salvar",
  cancelText = "Cancelar",
}: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || { name: "", status: true },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Nome da Categoria</FieldLabel>
            <Input {...field} id="name" aria-invalid={fieldState.invalid} />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Ex: Pizzas, Bebidas...</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox
              id="status"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor="status" className="font-normal cursor-pointer">
              Ativo
            </FieldLabel>
          </Field>
        )}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"ghost"} className="text-foreground/70">
            {cancelText}
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitText}
        </Button>
      </DialogFooter>
    </form>
  );
}
