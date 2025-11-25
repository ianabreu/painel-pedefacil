"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return <Button onClick={handleLogout}>Sair</Button>;
}
