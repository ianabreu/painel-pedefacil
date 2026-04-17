import { cookies } from "next/headers";
import { apiClient } from "./api";
import { Payload, User } from "@/@types/User";
import { verify } from "jsonwebtoken";
const COOKIE_NAME = "token_painel_delivery";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 dia
    path: "/",
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });
}
export function decrypt(token: string): Payload {
  return verify(token, process.env.JWT_SECRET as string) as Payload;
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUser(): Promise<User | null> {
  try {
    const token = await getToken();
    if (!token) return null;
    const user = await apiClient<User>("/auth/me", { token });
    return user;
  } catch {
    return null;
  }
}
