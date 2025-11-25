import { RegisterForm } from "@/components/auth/RegisterForm";
import { Logo } from "@/components/logo";

export default async function RegisterPage() {
  return (
    <main className="bg-background min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg p-6 flex flex-col items-center">
        <Logo />
        <RegisterForm />
      </div>
    </main>
  );
}

/*
"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterFormData, RegisterSchema } from "@/schemas";
import { api } from "@/services/api";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
  });

  async function onSubmit({
    email,
    password,
    employeeName,
    tenantName,
  }: RegisterFormData) {
    try {
      const result = await api.post("/admin/register", {
        email,
        employeeName,
        tenantName,
        password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
 */
