"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useActionState, useEffect } from "react";
import { registerAction } from "../_actions/register.action";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Title } from "@/components/title";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
    if (state?.error && state.error !== "") {
    }
  }, [state, router]);

  return (
    <>
      <Title className="my-2">Cadastro</Title>

      <form className="flex flex-col w-full gap-4" action={formAction}>
        <Input
          label="Nome"
          id="user_name"
          name="user_name"
          required
          minLength={3}
          type="text"
          placeholder="Digite seu nome..."
        />
        <Input
          label="E-mail"
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu email..."
        />
        <Input
          label="Nome da empresa"
          id="store_name"
          name="store_name"
          required
          minLength={3}
          type="text"
          placeholder="Digite o nome de sua empresa..."
        />
        <Input
          label="Senha"
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha..."
        />

        <Button
          className="w-full mt-2"
          variant={"default"}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <span className="animate-spin">
              <Loader />
            </span>
          ) : (
            "Criar conta"
          )}
        </Button>
        {state?.error && (
          <span className="text-xs text-red-500 text-center">
            {state.error}
          </span>
        )}
      </form>
      <p className="text-center text-sm text-gray-700 mt-4">
        Já tem cadastro?{" "}
        <Link className="text-primary hover:underline" href={ROUTES.LOGIN}>
          Faça login
        </Link>
      </p>
    </>
  );
}
