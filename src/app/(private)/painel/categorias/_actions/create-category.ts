"use server";

import { Category, CATEGORY_STATUS } from "@/@types/Category";
import { ApiResponse } from "@/@types/ApiResponse";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(data: {
  name: string;
  status: boolean;
}): Promise<ApiResponse<Category>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = "/admin/categories";
  try {
    const category = await apiClient<Category>(endpoint, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        status: data.status ? CATEGORY_STATUS.ACTIVE : CATEGORY_STATUS.INACTIVE,
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
    return { success: false, error: "Erro ao cadastrar categoria." };
  }
}
