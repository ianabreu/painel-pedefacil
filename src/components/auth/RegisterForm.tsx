"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { registerNewTenant } from "@/actions/registerNewTenant";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const router = useRouter();

  async function onSubmit(formData: RegisterFormData) {
    const data = await registerNewTenant(formData);
    if (!data) {
      setError("root", {
        type: "server",
        message: "Erro ao criar a conta. Tente novamente.",
      });
      return;
    }
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    router.replace("/painel");
  }

  return (
    <>
      <h2 className="font-bold text-2xl my-2 text-accent-foreground">
        Criar conta
      </h2>
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("tenantName", { required: true })}
          id="tenantName"
          type="text"
          placeholder="Digite aqui o nome do estabelecimento"
          name="tenantName"
          label="Nome do estabelecimento"
          error={errors.tenantName?.message}
        />
        <Input
          {...register("employeeName", { required: true })}
          id="employeeName"
          type="text"
          placeholder="Digite seu nome"
          name="employeeName"
          label="Nome"
          error={errors.employeeName?.message}
        />
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
            "Criar conta"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-700 mt-4">
        Já possui uma conta?{" "}
        <Link className="text-primary hover:underline" href={"/login"}>
          Entre aqui
        </Link>
      </p>
    </>
  );
}
