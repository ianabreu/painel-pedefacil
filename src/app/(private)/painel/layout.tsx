import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header/header";
import { getUser } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Pede Fácil - Painel",
  description: "Painel administrativo do Pede Fácil",
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect(ROUTES.LOGIN, RedirectType.replace);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen flex-1">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
