"use client";
import { Size, SizeGroup } from "@/@types/Size";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";
import { SizeFormData } from "../_validation/size.schema";
import { useState } from "react";
import { FormModal } from "@/components/form-modal";
import { SizeForm } from "./size-form";

interface SizeItemProps {
  size: Size;
  onEdit: (id: string, formData: SizeFormData) => Promise<void>;
  onDelete: () => Promise<void>;
  sizeGroup?: SizeGroup;
}
export function SizeItem({ size, onDelete, onEdit, sizeGroup }: SizeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  async function handleEdit(data: SizeFormData) {
    try {
      await onEdit(size.id, data);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

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
        <FormModal
          title="Editar tipo de produto"
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <Button
              variant={"ghost"}
              size={"icon-xs"}
              className={cn("text-foreground")}
            >
              <Edit2 />
            </Button>
          }
        >
          <SizeForm
            onSubmit={handleEdit}
            defaultValues={{ ...size }}
            selectedSizeGroup={sizeGroup}
          />
        </FormModal>
        <Button variant={"ghost"} size={"icon-sm"}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
