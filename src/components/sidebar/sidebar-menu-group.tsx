"use client";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { MenuItem, SidebarLinkType } from "./sidebar-menu-item";
import { usePathname } from "next/navigation";

export interface MenuGroupProps {
  title?: string;
  links: SidebarLinkType[];
  defaultOpen?: boolean;
}
export function MenuGroup({ links, title = "Menu" }: MenuGroupProps) {
  const pathname = usePathname();

  return (
    <Collapsible
      defaultOpen={links.some((link) => link.url === pathname)}
      className="group/collapsible gap-0 m-0 p-0"
    >
      <SidebarGroup className="gap-0 m-0 py-1">
        <SidebarGroupLabel asChild className="text-foreground text-sm">
          <CollapsibleTrigger className="cursor-pointer">
            {title}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item, index) => (
                <MenuItem
                  item={item}
                  key={index}
                  active={item.url === pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
