import { Plus, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptySizeGroupProps {
  className?: string;
  onAction?: () => void;
}

export function EmptySizeGroup({ className, onAction }: EmptySizeGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 min-h-[280px]",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 mb-4">
        <Ruler className="h-8 w-8 text-primary" />
      </div>

      <div className="flex flex-col items-center gap-1 mb-6 max-w-[250px]">
        <h3 className="text-lg font-semibold text-foreground text-center">
          Nenhum tamanho cadastrado
        </h3>
        <p className="text-sm text-foreground/70 text-center">
          Comece criando um tipo de produto para organizar sua grade de
          tamanhos.
        </p>
      </div>

      <Button onClick={onAction} className="gap-2">
        <Plus className="h-4 w-4" />
        Novo tipo de produto
      </Button>
    </div>
  );
}
