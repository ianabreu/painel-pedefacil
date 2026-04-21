"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { SizeGroup } from "@/@types/Size";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSizeGroup(
  id: string,
): Promise<ApiResponse<SizeGroup>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/size-groups/${id}`;
  try {
    const deletedSizeGroup = await apiClient<SizeGroup>(endpoint, {
      method: "DELETE",
      token,
    });
    revalidateTag(generateTag.sizeGroups(storeId), {
      expire: 0,
    });
    return { success: true, data: deletedSizeGroup };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao deletar tipo de produto" };
  }
}
