"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { Size } from "@/@types/Size";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { SizeFormData } from "../_validation/size.schema";

export async function createSize({
  description,
  acronym,
  allowMixingFlavors,
  sizeGroupId,
}: SizeFormData): Promise<ApiResponse<Size>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = "/admin/sizes";
  try {
    const size = await apiClient<Size>(endpoint, {
      method: "POST",
      body: JSON.stringify({
        description,
        acronym,
        allowMixingFlavors,
        sizeGroupId,
      }),
      token,
    });
    revalidateTag(generateTag.sizeGroups(storeId), {
      expire: 0,
    });
    return { success: true, data: size };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao cadastrar tamanho." };
  }
}
