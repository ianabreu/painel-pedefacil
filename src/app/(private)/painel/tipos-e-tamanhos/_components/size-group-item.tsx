"use client";
import { SizeGroup } from "@/@types/Size";
import { FormModal } from "@/components/form-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { SizeGroupForm } from "./size-group-form";
import { SizeGroupFormData } from "../_validation/size-group.schema";
import { useState } from "react";

interface SizeGroupItemProps {
  sizeGroup: SizeGroup;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEdit: (id: string, formData: SizeGroupFormData) => Promise<void>;
}
export function SizeGroupItem({
  sizeGroup,
  isSelected = false,
  onSelect,
  onEdit,
}: SizeGroupItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  async function handleEdit(formData: SizeGroupFormData) {
    try {
      await onEdit(sizeGroup.id, formData);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={cn(
        "flex w-full justify-between items-center px-2 rounded-lg h-9",
        "group overflow-hidden",
        isSelected
          ? "bg-primary/15 text-primary"
          : "bg-transparent text-foreground",
      )}
    >
      <button
        className="w-full text-start"
        onClick={() => onSelect && onSelect(sizeGroup.id)}
      >
        <span className="text-sm font-medium w-full text-nowrap">
          {sizeGroup.name}
        </span>
      </button>
      <FormModal
        title="Editar tipo de produto"
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button
            variant={isSelected ? "link" : "ghost"}
            size={"icon-xs"}
            className={cn(
              isSelected ? "text-primary" : "text-foreground",
              "opacity-0 translate-x-full pointer-events-none",
              "transition-all duration-300 ease-out",
              "group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto",
            )}
          >
            <Edit2 />
          </Button>
        }
      >
        <SizeGroupForm
          onSubmit={handleEdit}
          defaultValues={{ name: sizeGroup.name }}
        />
      </FormModal>
    </div>
  );
}
