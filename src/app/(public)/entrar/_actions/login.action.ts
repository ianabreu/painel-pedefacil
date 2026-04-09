"use server";

import { apiClient } from "@/lib/api";
import { LoginSchema } from "../_validation/login.schema";
import { ROUTES } from "@/constants/routes";
import { AuthResponse } from "@/@types/AuthResponse";
import { ZodError } from "zod";
import { setToken } from "@/lib/auth";

export async function loginAction(
  prevState: { success: boolean; error: string; redirectTo?: string } | null,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = LoginSchema.parse({
      email,
      password,
    });

    const response = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    await setToken(response.access_token);

    return { success: true, error: "", redirectTo: ROUTES.DASHBOARD };
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues[0].message || "Erro ao fazer login",
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message || "Erro ao fazer login" };
    }
    return { success: false, error: "Erro ao fazer login" };
  }
}
