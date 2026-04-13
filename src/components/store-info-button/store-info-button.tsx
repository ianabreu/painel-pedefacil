"use client";
import { User } from "@/@types/User";
import { StoreInfoTrigger } from "./store-info-trigger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { LogOut, Store, KeyRound } from "lucide-react";

interface StoreInfoProps {
  user: User;
}
export function StoreInfo({ user }: StoreInfoProps) {
  return (
    <DropdownMenu>
      <StoreInfoTrigger user={user} />
      <DropdownMenuContent className="w-full" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
            <KeyRound /> Assinaturas
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Store /> Ver dados da loja
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
            <LogOut /> Sair da sessão
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
