"use server";

import { Category } from "@/@types/Category";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";

export enum OrderDirection {
  ASC = "asc",
  DESC = "desc",
}

interface SearchParams {
  search?: string;
}
export async function getCategories({ search }: SearchParams) {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");
  let query = "";
  if (search && search.trim() !== "") {
    query = `?search=${search}`;
  }
  const categories = await apiClient<Category[]>(`/admin/categories${query}`, {
    token,
  });
  return categories;
}
