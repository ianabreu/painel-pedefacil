import { LucideProps } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { RefAttributes } from "react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: SidebarLinkType;
  active?: boolean;
}

export type SidebarLinkType = {
  title: string;
  url: string;
  icon: React.ComponentType<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export function MenuItem({ item, active = false }: MenuItemProps) {
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "flex items-center gap-2 transition-colors duration-300 text-foreground/70 text-sm",
          "hover:bg-sidebar-primary/15 hover:text-sidebar-primary",
          active && "bg-sidebar-primary/15 text-sidebar-primary",
        )}
      >
        <a href={item.url}>
          <Icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
