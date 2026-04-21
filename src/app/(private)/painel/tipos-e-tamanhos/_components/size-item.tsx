"use client";
import { Size } from "@/@types/Size";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";

interface SizeItemProps {
  size: Size;
}
export function SizeItem({ size }: SizeItemProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-start items-center px-4 py-2 gap-2 rounded-lg border shadow-lg",
        "group overflow-hidden",
        "bg-white text-foreground",
      )}
    >
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div>
          <span className="text-sm font-bold">{size.description}</span>
        </div>
        <div className="bg-primary/15 text-foreground/70 font-medium px-2 rounded w-fit">
          <span className="text-sm font-medium">{size.acronym}</span>
        </div>
      </div>
      <div className="flex gap-2 text-foreground/70">
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          onClick={() => alert(size.acronym)}
        >
          <Edit2 />
        </Button>
        <Button variant={"ghost"} size={"icon-sm"}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
