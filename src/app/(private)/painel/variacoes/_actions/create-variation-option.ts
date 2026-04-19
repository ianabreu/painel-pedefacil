"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { VariationOption } from "@/@types/Variation";
import { VariationOptionFormData } from "../_validation/variation-option.schema";

export async function createVariationOption(
  data: VariationOptionFormData,
): Promise<ApiResponse<VariationOption>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = "/admin/variations/items";
  try {
    const variationOption = await apiClient<VariationOption>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      token,
    });
    revalidateTag(generateTag.variationsTypes(storeId), {
      expire: 0,
    });
    return { success: true, data: variationOption };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao cadastrar opção de variação." };
  }
}
