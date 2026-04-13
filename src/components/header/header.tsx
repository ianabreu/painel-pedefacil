import { Bell, Mail } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationButton } from "@/components/header/notification-button";
import { StoreStatus } from "@/components/header/store-status";
import { StoreInfo } from "../store-info-button/store-info-button";
import { USER_ROLE, USER_STATUS } from "@/@types/User";

export function Header() {
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
        <StoreInfo
          user={{
            id: "eb75dc07-46f7-41a2-9d03-960d9302bf15",
            email: "ian@teste.com",
            name: "Ian",
            role: USER_ROLE.ADMIN,
            status: USER_STATUS.ACTIVE,
            createdAt: new Date("2026-04-03T02:48:13.175Z"),
            updatedAt: new Date("2026-04-03T02:48:13.175Z"),
            storeId: "877cca8f-5bb0-446e-8c36-914b25fbcd2b",
            store: {
              id: "877cca8f-5bb0-446e-8c36-914b25fbcd2b",
              name: "Chega já",
              url: "chega-ja-877c",
              createdAt: new Date("2026-04-03T02:48:13.152Z"),
              updatedAt: new Date("2026-04-03T02:48:13.152Z"),
            },
          }}
        />
      </div>
    </header>
  );
}
