"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { Category } from "@/@types/Category";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export enum OrderDirection {
  ASC = "asc",
  DESC = "desc",
}

interface SearchParams {
  search?: string;
}
export async function getCategories({
  search,
}: SearchParams): Promise<ApiResponse<Category[]>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const params = new URLSearchParams();
  if (search?.trim()) {
    params.append("search", search.trim());
  }
  const queryString = params.toString() ? `?${params.toString()}` : "";
  const endpoint = `/admin/categories${queryString}`;
  try {
    const categories = await apiClient<Category[]>(endpoint, {
      token,
      cache: "force-cache",
      next: {
        tags: [generateTag.categories(storeId)],
        revalidate: 3600,
      },
    });
    return { success: true, data: categories };
  } catch {
    return {
      success: false,
      error: "Falha ao carregar categorias. Tente novamente mais tarde.",
    };
  }
}
