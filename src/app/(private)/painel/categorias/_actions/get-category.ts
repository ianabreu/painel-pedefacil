import { Category } from "@/types/category";

export async function getAllCategories(): Promise<Category[]> {
  return [
    {
      id: "1",
      sequence: 1,
      name: "Pizzas",
      status: "active",
    },
    {
      id: "2",
      sequence: 2,
      name: "Babidas",
      status: "active",
    },
    {
      id: "3",
      sequence: 3,
      name: "Vinhos",
      status: "active",
    },
  ];
}
