import Image from "next/image";

export function Logo() {
  return (
    <div draggable={false} className="flex flex-row items-center">
      <Image
        draggable={false}
        src={"/img/logo.png"}
        width={0}
        height={0}
        sizes="100vw"
        alt="Logotipo Pede Fácil"
        className="object-contain w-auto h-20"
        priority
      />
    </div>
  );
}
