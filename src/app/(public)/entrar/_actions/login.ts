"use server";

import { apiClient } from "@/lib/api";
import { LoginDTO } from "../_validation/login.schema";
import { AuthResponse } from "@/@types/AuthResponse";
import { ZodError } from "zod";
import { setToken } from "@/lib/auth";
import { ApiResponse } from "@/@types/ApiResponse";
import { User } from "@/@types/User";

export async function login(credentials: LoginDTO): Promise<ApiResponse<User>> {
  try {
    const response = await apiClient<AuthResponse>("/auth/login", {
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
        error: error.issues[0].message || "Erro ao fazer login",
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message || "Erro ao fazer login" };
    }
    return { success: false, error: "Erro ao fazer login" };
  }
}
