"use server";

import { apiClient } from "@/lib/api";
import { RegisterDTO } from "../_validation/register.schema";
import { ZodError } from "zod";
import { setToken } from "@/lib/auth";
import { AuthResponse } from "@/@types/AuthResponse";
import { ApiResponse } from "@/@types/ApiResponse";
import { User } from "@/@types/User";

export async function register(
  credentials: RegisterDTO,
): Promise<ApiResponse<User>> {
  try {
    const response = await apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    await setToken(response.access_token);

    return { success: true, data: response.user };
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
