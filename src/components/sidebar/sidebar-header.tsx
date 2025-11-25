import Image from "next/image";
import { SidebarHeader as SidebarHeaderUI } from "../ui/sidebar";
interface SidebarHeaderProps {
  store: {
    name: string;
    logoURL: string;
  };
}
export function SidebarHeader({ store }: SidebarHeaderProps) {
  return (
    <SidebarHeaderUI className="items-center mt-4">
      <Image src={store.logoURL} width={180} height={50} alt="Logo da Loja" />
      <span className="text-lg font-semibold">{store.name}</span>
    </SidebarHeaderUI>
  );
}
