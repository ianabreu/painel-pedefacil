"use client";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface StoreStatusItemProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export function StoreStatusItem({
  children,
  href,
  onClick,
}: StoreStatusItemProps) {
  const content = (
    <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
      {children}
    </DropdownMenuItem>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
