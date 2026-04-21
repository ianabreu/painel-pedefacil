"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  SizeGroupFormData,
  sizeGroupSchema,
} from "../_validation/size-group.schema";

interface VariationFormProps {
  defaultValues?: SizeGroupFormData;
  onSubmit: (data: SizeGroupFormData) => Promise<void>;
  submitText?: string;
  cancelText?: string;
}

export function SizeGroupForm({
  defaultValues,
  onSubmit,
  submitText = "Salvar",
  cancelText = "Cancelar",
}: VariationFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SizeGroupFormData>({
    resolver: zodResolver(sizeGroupSchema),
    defaultValues: defaultValues || { name: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input
              {...field}
              id="name"
              aria-invalid={fieldState.invalid}
              placeholder="Ex: Pizzas"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
