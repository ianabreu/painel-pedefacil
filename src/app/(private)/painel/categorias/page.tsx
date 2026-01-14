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
import { getCategories } from "@/services/category.service";
import { DataTableDemo } from "./_actions/teste";

export default async function CategoryPage() {
  const { results, limit, page, total } = await getCategories();
  return (
    <div>
      <div className="flex justify-between">
        <h2>Categorias</h2>
        <Button>Nova Categoria</Button>
      </div>
      <DataTableDemo />

      {/* { <Table>
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
          {results.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.position}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.status === "ACTIVE" ? "Ativo" : "Inativo"}
              </TableCell>
              <TableCell>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>*/}
    </div>
  );
}
