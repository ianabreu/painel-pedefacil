import { Card } from "@/components/card";
import { Title } from "@/components/title";
import { CategoryItem } from "./_components/category-item";
import { getCategories } from "./_actions/get-categories";
import SearchInput from "@/components/search-input";
import { cn } from "@/lib/utils";
import { EmptyCategory } from "./_components/empty-category";
import { CreateCategoryDialog } from "./_components/create-category-dialog";

interface CategoryPageProps {
  searchParams: Promise<{ search?: string }>;
}
export default async function CategoryPage({
  searchParams,
}: CategoryPageProps) {
  const { search } = await searchParams;

  const response = await getCategories({
    search,
  });
  if (!response.success) {
    return (
      <Card className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground">{response.error}</p>
        </div>
      </Card>
    );
  }
  const categories = response.data;

  return (
    <Card className="flex flex-col gap-2">
      {/*Header*/}
      <div
        className={cn(
          "flex flex-col justify-center items-start gap-2",
          "sm:flex-row sm:justify-between sm:items-center",
        )}
      >
        <div className="flex flex-col gap-1 w-full">
          <Title>Categorias</Title>
          <p className="text-foreground/70 text-sm text-nowrap">
            Visualize e edite suas categorias
          </p>
        </div>
        <div className="w-full sm:w-fit">
          <CreateCategoryDialog />
        </div>
      </div>
      {/*Search*/}
      <div className="w-full sm:max-w-80">
        <SearchInput placeholder="Buscar categoria pelo nome..." />
      </div>
      {/*List*/}

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
    </Card>
  );
}
