"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth.service";

export function LogoutButton() {
  async function handleLogout() {
    await signOut();
  }
  return <Button onClick={handleLogout}>Sair</Button>;
}
