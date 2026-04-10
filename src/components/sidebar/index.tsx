"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MenuGroup } from "./sidebar-menu-group";
import Image from "next/image";
import { ORDER_LINKS, PRODUCT_LINKS, STORE_LINKS } from "@/constants/links";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="items-center mt-4">
        <Image
          src={"/img/logo.png"}
          width={0}
          height={0}
          alt="Pede Fácil Delivery"
          sizes="50vw"
          className="h-16 w-fit object-contain"
          priority
        />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <MenuGroup links={ORDER_LINKS} title="Pedidos" />
        <MenuGroup links={PRODUCT_LINKS} title="Cardápio" />
        <MenuGroup links={STORE_LINKS} title="Configurações" />
      </SidebarContent>
    </Sidebar>
  );
}
