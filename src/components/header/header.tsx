import { Bell, Mail } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationButton } from "@/components/header/notification-button";
import { StoreStatus } from "@/components/header/store-status";
import { StoreInfo } from "../store-info-button/store-info-button";
import { User } from "@/@types/User";

export function Header({ user }: { user: User }) {
  return (
    <header
      className={`flex h-16 w-full items-center border-b bg-card gap-4 px-4`}
    >
      <SidebarTrigger className="cursor-pointer" />
      <div className="flex flex-row gap-4 w-full items-center justify-end">
        <StoreStatus />
        <NotificationButton count={5}>
          <Bell />
        </NotificationButton>
        <NotificationButton count={4}>
          <Mail />
        </NotificationButton>
        <StoreInfo user={user} />
      </div>
    </header>
  );
}
