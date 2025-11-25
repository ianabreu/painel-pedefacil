import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCategories } from "./_actions/get-category";

export default async function CategoryPage() {
  const categories = await getAllCategories();
  return (
    <div>
      <div className="flex justify-between">
        <h2>Categorias</h2>
        <Button>Nova Categoria</Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ordem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.sequence}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.status === "active" ? "Ativo" : "Inativo"}
              </TableCell>
              <TableCell>
                {/* Actions such as Edit/Delete can be added here */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
