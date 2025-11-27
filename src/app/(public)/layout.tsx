import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}
export default async function PublicLayout({ children }: PrivateLayoutProps) {
  return <>{children}</>;
}
