import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Box,
  Calendar,
  ListTodo,
  Store,
  Tags,
  Truck,
  Wallet,
} from "lucide-react";
import { MenuGroup } from "./sidebar-menu-group";
import { SidebarLinkType } from "./sidebar-menu-item";
import { SidebarHeader } from "./sidebar-header";

const productConfigLinks: SidebarLinkType[] = [
  {
    title: "Categorias",
    url: "/categorias",
    icon: Tags,
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Box,
  },
];
const storeConfigLinks: SidebarLinkType[] = [
  {
    title: "Loja",
    url: "/loja",
    icon: Store,
  },
  {
    title: "Pedidos",
    url: "/pedidos",
    icon: ListTodo,
  },
  {
    title: "Entrega",
    url: "/entregas",
    icon: Truck,
  },
  {
    title: "Meios de Pagamento",
    url: "/pagamentos",
    icon: Wallet,
  },
  {
    title: "Horário de Funcionamento",
    url: "/horario",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader
        store={{ name: "Pizzaria Paraiso", logoURL: "/img/logo.png" }}
      />
      <SidebarContent>
        <MenuGroup links={productConfigLinks} title="Cardápio" />
        <MenuGroup links={storeConfigLinks} title="Configurações" />
      </SidebarContent>
    </Sidebar>
  );
}
