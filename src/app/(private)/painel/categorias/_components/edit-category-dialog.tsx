"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "./category-form";
import { CategoryFormData } from "../_validation/category.schema";
import { updateCategory } from "../_actions/update-category";

interface EditCategoryProps {
  category: CategoryFormData & { id: string };
}

export function EditCategoryDialog({ category }: EditCategoryProps) {
  const [open, setOpen] = useState(false);

  async function handleUpdate(categoryFormData: CategoryFormData) {
    const result = await updateCategory(category.id, categoryFormData);
    if (result.success) {
      setOpen(false);
      toast.success("Categoria atualizada!");
    } else {
      toast.error(result.error || "Erro ao atualizar categoria.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
        </DialogHeader>
        <CategoryForm
          defaultValues={category}
          onSubmit={handleUpdate}
          submitText="Salvar Alterações"
        />
      </DialogContent>
    </Dialog>
  );
}
