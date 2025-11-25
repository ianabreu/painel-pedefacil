"use client";
import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface NextAuthSessionProviderProps {
  children: ReactNode;
}

function SessionProvider({ children }: NextAuthSessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

export { SessionProvider };
