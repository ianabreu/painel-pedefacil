import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { getVariations } from "./_actions/get-variations";
import { cn } from "@/lib/utils";
import { VariationList } from "./_components/variation-list";

export default async function VariationPage() {
  const response = await getVariations();
  if (!response.success) {
    return (
      <Card className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground">{response.error}</p>
        </div>
      </Card>
    );
  }
  const variations = response.data;

  return (
    <Card className="flex flex-col gap-2">
      <div
        className={cn(
          "flex flex-col justify-center items-start gap-2",
          "sm:flex-row sm:justify-between sm:items-center",
        )}
      >
        <div className="flex flex-col gap-1 w-full">
          <Title>Variações</Title>
          <p className="text-foreground/70 text-sm text-nowrap">
            Cadastre e gerencie as variações de produtos e suas opções de
            tamanho.
          </p>
        </div>
      </div>
      <VariationList variations={variations} />
    </Card>
  );
}
