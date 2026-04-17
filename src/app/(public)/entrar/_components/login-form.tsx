"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { login } from "../_actions/login";
import { ROUTES } from "@/constants/routes";
import { Title } from "@/components/title";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDTO, LoginSchema } from "../_validation/login.schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  async function onSubmit(credentials: LoginDTO) {
    const result = await login(credentials);

    if (!result.success) {
      form.reset();
      toast.error(result.error || `Erro ao fazer login`);
    } else {
      form.reset();
      toast.success(`Bem vindo(a) ao sistema ${result.data.name}.`);
      router.replace(ROUTES.DASHBOARD);
    }
  }

  return (
    <>
      <Title className="my-2">Login</Title>
      <p className="text-foreground/70">Bem vindo de volta!</p>

      <form
        className="flex flex-col w-full gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
            "Acessar"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-foreground mt-2">
        Novo por aqui?{" "}
        <Link className="text-primary hover:underline" href={ROUTES.REGISTER}>
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
