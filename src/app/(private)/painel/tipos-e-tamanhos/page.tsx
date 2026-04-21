import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { cn } from "@/lib/utils";
import { getSizeGroups } from "./_actions/get-size-groups";
import { SizeManager } from "./_components/size-manager";

export default async function SizesPage() {
  const response = await getSizeGroups();
  if (!response.success) {
    return (
      <Card className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground">{response.error}</p>
        </div>
      </Card>
    );
  }
  const sizeGroups = response.data;

  return (
    <Card className="flex flex-col gap-2">
      <div
        className={cn(
          "flex flex-col justify-center items-start gap-2",
          "sm:flex-row sm:justify-between sm:items-center",
        )}
      >
        <div className="flex flex-col gap-1 w-full">
          <Title>Tipos e Tamanhos</Title>
          <p className="text-foreground/70 text-sm">
            Cadastre e gerencie os tipos de produtos e suas opções de tamanho.
          </p>
        </div>
      </div>

      <SizeManager sizeGroups={sizeGroups} />
    </Card>
  );
}
