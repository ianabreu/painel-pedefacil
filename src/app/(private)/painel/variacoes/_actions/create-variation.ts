"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Variation } from "@/@types/Variation";

export async function createVariation(data: {
  name: string;
}): Promise<ApiResponse<Variation>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = "/admin/variations/types";
  try {
    const variation = await apiClient<Variation>(endpoint, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
      }),
      token,
    });
    revalidateTag(generateTag.variationsTypes(storeId), {
      expire: 0,
    });
    return { success: true, data: variation };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao cadastrar variação." };
  }
}
