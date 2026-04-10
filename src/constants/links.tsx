import {
  Box,
  Calendar,
  ListTodo,
  NotebookPen,
  Store,
  Tags,
  Truck,
  Wallet,
} from "lucide-react";
import { ROUTES } from "./routes";
import { SidebarLinkType } from "@/components/sidebar/sidebar-menu-item";

export const ORDER_LINKS: SidebarLinkType[] = [
  {
    title: "Pedidos",
    url: ROUTES.DASHBOARD,
    icon: NotebookPen,
  },
];
export const PRODUCT_LINKS: SidebarLinkType[] = [
  {
    title: "Produtos",
    url: ROUTES.PRODUCTS,
    icon: Box,
  },
  {
    title: "Categorias",
    url: ROUTES.CATEGORIES,
    icon: Tags,
  },
  {
    title: "Variações",
    url: ROUTES.VARIATIONS,
    icon: Box,
  },
  {
    title: "Complementos",
    url: ROUTES.COMPLEMENTS,
    icon: Box,
  },
];
export const STORE_LINKS: SidebarLinkType[] = [
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
