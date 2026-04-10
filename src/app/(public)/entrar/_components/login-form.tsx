"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { loginAction } from "../_actions/login.action";
import { useActionState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import { Title } from "@/components/title";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
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
      <Title className="my-2">Login</Title>
      <p className="text-foreground/70">Bem vindo de volta!</p>

      <form className="flex flex-col w-full gap-4" action={formAction}>
        <Input
          label="E-mail"
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu email..."
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
            "Acessar"
          )}
        </Button>
        {state?.error && (
          <span className="text-xs text-red-500 text-center">
            {state.error}
          </span>
        )}
      </form>
      <p className="text-center text-sm text-foreground mt-4">
        Novo por aqui?{" "}
        <Link className="text-primary hover:underline" href={ROUTES.REGISTER}>
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
