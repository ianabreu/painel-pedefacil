"use client";

import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

export function AuthForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const router = useRouter();
  async function onSubmit({ email, password }: LoginFormData) {
    try {
      const isAuth = await signIn({ email, password });
      if (isAuth) {
        router.replace("/painel");
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("root", { message: err?.message });
      } else {
        setError("root", { message: "Algo deu errado! Tente novamente" });
      }
    }
    setTimeout(() => {
      clearErrors("root");
    }, 3000);
  }

  return (
    <>
      <h2 className="font-bold text-2xl my-2 text-accent-foreground">
        Faça Login
      </h2>
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email", { required: true })}
          id="email"
          type="email"
          placeholder="Digite seu email..."
          name="email"
          label="E-mail"
          error={errors.email?.message}
        />
        <Input
          {...register("password", { required: true })}
          id="password"
          type="password"
          placeholder="Digite sua senha..."
          name="password"
          label="Senha"
          error={errors.password?.message}
        />
        <span className="text-xs text-red-500 text-center">
          {errors.root?.message}
        </span>

        <Button
          className="w-full mt-2"
          variant={"default"}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="animate-spin">
              <Loader />
            </span>
          ) : (
            "Acessar"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-700 mt-4">
        Não tem cadastro?{" "}
        <Link className="text-primary hover:underline" href={"/cadastro"}>
          Registre aqui sua empresa.
        </Link>
      </p>
    </>
  );
}
