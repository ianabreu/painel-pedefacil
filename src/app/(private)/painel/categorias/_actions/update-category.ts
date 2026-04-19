"use server";

import { Category, CATEGORY_STATUS } from "@/@types/Category";
import { ApiResponse } from "@/@types/ApiResponse";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryFormData } from "../_validation/category.schema";

export async function updateCategory(
  categoryId: string,
  categoryFormData: CategoryFormData,
): Promise<ApiResponse<Category>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/categories/${categoryId}`;
  try {
    const category = await apiClient<Category>(endpoint, {
      method: "PATCH",
      body: JSON.stringify({
        name: categoryFormData.name,
        status: categoryFormData.status
          ? CATEGORY_STATUS.ACTIVE
          : CATEGORY_STATUS.INACTIVE,
      }),
      token,
    });
    revalidateTag(generateTag.categories(storeId), {
      expire: 0,
    });
    return { success: true, data: category };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao atualizar categoria." };
  }
}
