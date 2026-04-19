"use server";

import { Category } from "@/@types/Category";
import { ApiResponse } from "@/@types/ApiResponse";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCategory(
  categoryId: string,
): Promise<ApiResponse<Category>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/categories/${categoryId}`;
  try {
    const deletedCategory = await apiClient<Category>(endpoint, {
      method: "DELETE",
      token,
    });
    revalidateTag(generateTag.categories(storeId), {
      expire: 0,
    });
    return { success: true, data: deletedCategory };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao deletar categoria." };
  }
}
