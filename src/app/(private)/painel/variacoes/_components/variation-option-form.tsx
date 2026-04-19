"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  VariationOptionFormData,
  variationOptionSchema,
} from "../_validation/variation-option.schema";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Variation } from "@/@types/Variation";

interface VariationOptionFormProps {
  defaultValues?: VariationOptionFormData;
  onSubmit: (data: VariationOptionFormData) => Promise<void>;
  submitText?: string;
  cancelText?: string;
  variations: Variation[];
  selectedVariation: Variation;
}

export function VariationOptionForm({
  variations,
  selectedVariation,
  defaultValues,
  onSubmit,
  submitText = "Salvar",
  cancelText = "Cancelar",
}: VariationOptionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VariationOptionFormData>({
    resolver: zodResolver(variationOptionSchema),
    defaultValues: defaultValues || {
      description: "",
      acronym: "",
      allowMixingFlavors: false,
      variationTypeId: selectedVariation.id,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ex: Pizzas"
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Exemplo: Pequena, Média... </FieldDescription>
            )}
          </Field>
        )}
      />
      <Controller
        name="acronym"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Sigla</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ex: Pizzas"
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>
                Usado em impressões: P para Pequena...
              </FieldDescription>
            )}
          </Field>
        )}
      />
      <Controller
        name="variationTypeId"
        control={control}
        render={({ field }) => (
          <Field className="w-full">
            <FieldLabel>Tipo</FieldLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha o tipo de variação" />
              </SelectTrigger>
              <SelectContent position={"item-aligned"}>
                {variations.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Controller
        name="allowMixingFlavors"
        control={control}
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox
              id={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel
              htmlFor={field.name}
              className="font-normal cursor-pointer"
            >
              Permite mistura de sabores?
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
