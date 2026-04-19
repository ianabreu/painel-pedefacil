"use client";
import { Variation } from "@/@types/Variation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";

interface VariationTypeItemProps {
  variation: Variation;
  selected?: boolean;
  onClick: (variationTypeId: string) => void;
}
export function VariationRow({
  variation,
  selected = false,
  onClick,
}: VariationTypeItemProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-between items-center px-2 rounded-lg h-9",
        "group overflow-hidden",
        selected
          ? "bg-primary/15 text-primary"
          : "bg-transparent text-foreground",
      )}
    >
      <button
        className="w-full text-start"
        onClick={() => onClick(variation.id)}
      >
        <span className="text-sm font-medium w-full text-nowrap">
          {variation.name}
        </span>
      </button>
      <Button
        variant={selected ? "link" : "ghost"}
        size={"icon-xs"}
        onClick={() => alert(variation.name)}
        className={cn(
          selected ? "text-primary" : "text-foreground",
          "opacity-0 translate-x-full pointer-events-none",
          "transition-all duration-300 ease-out",
          "group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto",
        )}
      >
        <Edit2 />
      </Button>
    </div>
  );
}
