import {
  Category,
  CATEGORY_STATUS,
  CATEGORY_STATUS_LABELS,
} from "@/@types/Category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, ExternalLink, GripVertical, Trash } from "lucide-react";

interface CategoryItemProps {
  category: Category;
}
export function CategoryItem({ category }: CategoryItemProps) {
  const status = CATEGORY_STATUS_LABELS[category.status];
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
        <Button variant={"ghost"} size={"icon"}>
          <Edit2 />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}
