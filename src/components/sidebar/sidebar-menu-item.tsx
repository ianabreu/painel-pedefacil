import { LucideProps } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { RefAttributes } from "react";

export type SidebarLinkType = {
  title: string;
  url: string;
  icon: React.ComponentType<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
export function MenuItem({ item }: { item: SidebarLinkType }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="hover:bg-sidebar-primary/15 hover:text-sidebar-primary transition-colors flex items-center gap-2"
      >
        <a href={`/painel${item.url}`}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
