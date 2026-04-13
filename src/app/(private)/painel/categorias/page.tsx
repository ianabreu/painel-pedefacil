import { Button } from "@/components/ui/button";

export default async function CategoryPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2>Categorias</h2>
        <Button>Nova Categoria</Button>
      </div>
    </div>
  );
}
