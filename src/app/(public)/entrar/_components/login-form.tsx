"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { loginAction } from "../_actions/login.action";
import { useActionState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";

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
      <h2 className="font-bold text-2xl my-2 text-accent-foreground">
        Faça Login
      </h2>
      <form className="flex flex-col w-full gap-2" action={formAction}>
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
      </form>
      <p className="text-center text-sm text-gray-700 mt-4">
        Não tem cadastro?{" "}
        <Link className="text-primary hover:underline" href={ROUTES.REGISTER}>
          Registre aqui sua empresa.
        </Link>
      </p>
      {state?.error && (
        <span className="text-xs text-red-500 text-center">{state.error}</span>
      )}
    </>
  );
}
