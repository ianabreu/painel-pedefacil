"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { Size } from "@/@types/Size";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSize(id: string): Promise<ApiResponse<Size>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/sizes/${id}`;
  try {
    const deletedSize = await apiClient<Size>(endpoint, {
      method: "DELETE",
      token,
    });
    revalidateTag(generateTag.sizeGroups(storeId), {
      expire: 0,
    });
    return { success: true, data: deletedSize };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao deletar tipo de produto" };
  }
}
