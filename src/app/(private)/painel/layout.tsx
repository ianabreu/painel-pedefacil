import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pede Fácil - Painel",
  description: "Painel administrativo do Pede Fácil",
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full min-h-screen">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
