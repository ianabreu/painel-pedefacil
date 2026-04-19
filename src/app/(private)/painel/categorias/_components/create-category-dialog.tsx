"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createCategory } from "../_actions/create-category";
import { toast } from "sonner";
import { CategoryForm } from "./category-form";
import { CategoryFormData } from "../_validation/category.schema";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  async function handleCreate(data: CategoryFormData) {
    const result = await createCategory(data);
    if (result.success) {
      setOpen(false);
      toast.success(`Categoria "${result.data.name}" criada com sucesso`);
    } else {
      toast.error(`Erro ao criar categoria.`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="sm:w-min w-full">
          <Plus /> Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar seus produtos.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm onSubmit={handleCreate} submitText="Criar categoria" />
      </DialogContent>
    </Dialog>
  );
}
