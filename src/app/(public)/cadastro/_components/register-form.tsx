"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { register } from "../_actions/register";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Title } from "@/components/title";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO, RegisterSchema } from "../_validation/register.schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", store_name: "", user_name: "" },
    mode: "onSubmit",
  });

  async function onSubmit(credentials: RegisterDTO) {
    const result = await register(credentials);

    if (!result.success) {
      form.reset();
      toast.error(result.error || `Erro ao cadastrar`);
    } else {
      form.reset();
      toast.success(`Bem vindo(a) ao sistema ${result.data.name}.`);
      router.replace(ROUTES.DASHBOARD);
    }
  }

  return (
    <>
      <Title className="my-2">Cadastro</Title>

      <form
        className="flex flex-col w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          name="user_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite seu nome..."
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite seu email..."
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="store_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Nome da empresa</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o nome de sua empresa..."
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite sua senha..."
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          className={cn("w-full mt-2", "disabled:cursor-not-allowed")}
          variant={"default"}
          size={"sm"}
          type="submit"
          disabled={form.formState.isSubmitting}
          aria-disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              Carregando...
              <span className="animate-spin">
                <Loader />
              </span>
            </>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-foreground mt-2">
        Já tem cadastro?{" "}
        <Link className="text-primary hover:underline" href={ROUTES.LOGIN}>
          Faça login
        </Link>
      </p>
    </>
  );
}
