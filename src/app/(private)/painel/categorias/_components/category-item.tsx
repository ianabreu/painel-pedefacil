"use client";
import {
  Category,
  CATEGORY_STATUS,
  CATEGORY_STATUS_LABELS,
} from "@/@types/Category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, GripVertical, Trash } from "lucide-react";
import { EditCategoryDialog } from "./edit-category-dialog";
import { deleteCategory } from "../_actions/delete-category";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface CategoryItemProps {
  category: Category;
}
export function CategoryItem({ category }: CategoryItemProps) {
  const status = CATEGORY_STATUS_LABELS[category.status];
  const { confirm } = useConfirm();

  async function handleDelete(categoryId: string) {
    confirm({
      title: "Excluir Categoria",
      description: `Você tem certeza que deseja excluir "${category.name}"? Esta ação é irreversível.`,
      confirmText: "Excluir categoria",
      variant: "danger",
      onConfirm: async () => {
        const result = await deleteCategory(categoryId);
        if (result.success) {
          toast.success("Categoria excluida com sucesso!");
        } else {
          toast.error(result.error || "Erro ao excluir categoria.");
        }
      },
    });
  }

  return (
    <div className="flex flex-row w-full justify-between items-center bg-white border shadow-md rounded-lg p-2 gap-2">
      <div>
        <Button variant={"ghost"} size={"icon"}>
          <GripVertical />
        </Button>
      </div>
      <div className="flex-4">
        <p className="font-semibold text-lg">{category.name}</p>
        <button className="text-primary font-semibold text-sm flex gap-1 items-center hover:underline">
          Ver produtos associados <ExternalLink size={16} />
        </button>
      </div>
      <div className="flex items-center justify-center flex-1">
        <Badge
          className={cn(
            "font-semibold",
            category.status === CATEGORY_STATUS.ACTIVE &&
              "bg-green-100 text-green-700",
            category.status === CATEGORY_STATUS.INACTIVE &&
              "bg-red-100 text-red-700",
          )}
        >
          {status}
        </Badge>
      </div>
      <div className="flex gap-2 text-foreground/70">
        <EditCategoryDialog
          category={{
            id: category.id,
            name: category.name,
            status: category.status === CATEGORY_STATUS.ACTIVE ? true : false,
          }}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => handleDelete(category.id)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
