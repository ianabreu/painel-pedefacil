"use server";
import { LoginFormData, RegisterFormData } from "@/schemas";
import { api } from "./api";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { Employee } from "@/types/auth/Employee";

type SignInProps = LoginFormData;
type SignUpProps = RegisterFormData;
type AuthResponse = Employee;

export async function signIn(credentials: SignInProps) {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    if (!response.data.accessToken) {
      return false;
    }
    const cookiesStore = await cookies();
    const expressTime = 60 * 1000;
    cookiesStore.set("session", response.data.accessToken, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  } catch (err) {
    const message = "Ops! Algo deu errado! Tente novamente";
    if (err && err instanceof AxiosError) {
      throw new Error(err.response?.data.message || message);
    } else {
      throw new Error(message);
    }
  }
}
export async function signUp(credentials: SignUpProps) {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    if (!response.data.accessToken) {
      return false;
    }
    const cookiesStore = await cookies();
    const expressTime = 60 * 1000;
    cookiesStore.set("session", response.data.accessToken, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  } catch (err) {
    const message = "Ops! Algo deu errado! Tente novamente";
    if (err && err instanceof AxiosError) {
      throw new Error(err.response?.data.message || message);
    } else {
      throw new Error(message);
    }
  }
}
export async function signOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/login");
}
