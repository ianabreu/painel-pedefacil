"use client";
import { Category } from "@/@types/Category";
import { EmptyCategory } from "./empty-category";
import { CreateCategoryDialog } from "./create-category-dialog";
import { CategoryItem } from "./category-item";

interface CategoryListProps {
  categories: Category[];
  search?: string;
}
export function CategoryList({ categories, search }: CategoryListProps) {
  return (
    <>
      {categories.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <EmptyCategory isSearchActive={!!search} searchTerm={search} />
          <CreateCategoryDialog />
        </div>
      )}
      {categories.length > 0 &&
        categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
    </>
  );
}
