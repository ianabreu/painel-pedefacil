"use server";
import { LoginFormData, RegisterFormData } from "@/schemas";
import { api } from "./api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginResponse } from "@/types/auth/User";

type SignInProps = LoginFormData;
type SignUpProps = RegisterFormData;
type AuthResponse = LoginResponse;

export async function signIn(credentials: SignInProps) {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    if (!response.access_token) {
      return false;
    }
    const cookiesStore = await cookies();
    const expressTime = 60 * 1000;
    cookiesStore.set("session", response.access_token, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  } catch (err) {
    const message = "Ops! Algo deu errado! Tente novamente";
    throw new Error(message);
  }
}
export async function signUp(credentials: SignUpProps) {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      credentials,
    );
    if (!response.access_token) {
      return false;
    }
    const cookiesStore = await cookies();
    const expressTime = 60 * 1000;
    cookiesStore.set("session", response.access_token, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  } catch (err) {
    const message = "Ops! Algo deu errado! Tente novamente";
    throw new Error(message);
  }
}
export async function signOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/login");
}
