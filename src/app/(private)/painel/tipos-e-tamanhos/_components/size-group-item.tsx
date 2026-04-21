"use client";
import { SizeGroup } from "@/@types/Size";
import { FormModal } from "@/components/form-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";
import { SizeGroupForm } from "./size-group-form";
import { SizeGroupFormData } from "../_validation/size-group.schema";
import { useState } from "react";

interface SizeGroupItemProps {
  sizeGroup: SizeGroup;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEdit: (id: string, formData: SizeGroupFormData) => Promise<void>;
  onDelete: (id: string, name: string) => Promise<void>;
}
export function SizeGroupItem({
  sizeGroup,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
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
  async function handleDelete() {
    try {
      await onDelete(sizeGroup.id, sizeGroup.name);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={cn(
        "flex w-full items-center px-2 rounded-lg h-9 transition-colors",
        "group overflow-hidden",
        isSelected
          ? "bg-primary/15 text-primary"
          : "bg-transparent text-foreground hover:bg-muted/50",
      )}
    >
      <div className="flex-1 min-w-0">
        <button
          className="w-full text-start text-sm font-medium truncate outline-none"
          onClick={() => onSelect && onSelect(sizeGroup.id)}
        >
          {sizeGroup.name}
        </button>
      </div>
      <div
        className={cn(
          "flex items-center gap-1 ml-2 transition-all duration-200",
          "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
        )}
      >
        <FormModal
          title="Editar tipo de produto"
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <Button
              variant={isSelected ? "link" : "ghost"}
              size={"icon-xs"}
              className={cn(isSelected ? "text-primary" : "text-foreground")}
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
        <Button
          variant={isSelected ? "link" : "ghost"}
          size={"icon-xs"}
          onClick={handleDelete}
          className={cn(isSelected ? "text-primary" : "text-foreground")}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
