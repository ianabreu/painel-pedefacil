"use client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pause, Timer } from "lucide-react";
import { StoreStatusItem } from "@/components//header/store-status-item";

export function StoreStatus() {
  function setOpenModalPausar(isOpen: boolean) {
    console.log(isOpen);
  }
  function setOpenModalFechar(isOpen: boolean) {
    console.log(isOpen);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="ghost"
          className={cn(
            "px-3 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer",
            "bg-green-100 text-green-700",
            "hover:bg-green-200 hover:text-green-700",
          )}
        >
          Loja Abreta
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuGroup>
          <StoreStatusItem onClick={() => setOpenModalPausar(true)}>
            <Pause /> Pausar Loja
          </StoreStatusItem>

          <StoreStatusItem onClick={() => setOpenModalFechar(true)}>
            <Timer /> Fechar Loja
          </StoreStatusItem>

          <StoreStatusItem href="/painel/loja/horarios-de-atendimento">
            <Calendar /> Ajustar horários
          </StoreStatusItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
