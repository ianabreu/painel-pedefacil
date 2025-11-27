import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header
      className={`flex h-16 w-full items-center border-b bg-background gap-4 px-4`}
    >
      <SidebarTrigger className="cursor-pointer" />
      <Image
        src={"/img/logo.png"}
        alt="Logo"
        width={0}
        height={0}
        sizes="50vw"
        className="h-12 w-fit object-contain"
        priority
      />
    </header>
  );
}
