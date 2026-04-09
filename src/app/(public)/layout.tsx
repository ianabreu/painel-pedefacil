import { ROUTES } from "@/constants/routes";
import { getUser } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}
export default async function PublicLayout({ children }: PrivateLayoutProps) {
  const user = await getUser();
  if (user) {
    redirect(ROUTES.DASHBOARD, RedirectType.replace);
  }
  return <>{children}</>;
}
