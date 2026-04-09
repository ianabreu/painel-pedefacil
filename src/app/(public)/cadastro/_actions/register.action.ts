"use server";

import { apiClient } from "@/lib/api";
import { RegisterSchema } from "../_validation/register.schema";
import { ROUTES } from "@/constants/routes";
import { ZodError } from "zod";
import { setToken } from "@/lib/auth";
import { AuthResponse } from "@/@types/AuthResponse";

export async function registerAction(
  prevState: { success: boolean; error: string; redirectTo?: string } | null,
  formData: FormData,
) {
  try {
    const user_name = formData.get("user_name") as string;
    const store_name = formData.get("store_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = RegisterSchema.parse({
      user_name,
      store_name,
      email,
      password,
    });

    const response = await apiClient<AuthResponse>("/auth/register", {
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
        error: error.issues[0].message || "Erro ao cadastrar",
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message || "Erro ao cadastrar" };
    }
    return { success: false, error: "Erro ao cadastrar" };
  }
}
