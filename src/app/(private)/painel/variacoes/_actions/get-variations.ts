"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { Variation } from "@/@types/Variation";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export enum OrderDirection {
  ASC = "asc",
  DESC = "desc",
}
export async function getVariations(): Promise<ApiResponse<Variation[]>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/variations/types`;
  try {
    const variationsTypes = await apiClient<Variation[]>(endpoint, {
      token,
      cache: "force-cache",
      next: {
        tags: [generateTag.variationsTypes(storeId)],
        revalidate: 3600,
      },
    });
    return { success: true, data: variationsTypes };
  } catch {
    return {
      success: false,
      error:
        "Falha ao carregar os tipos de variação. Tente novamente mais tarde.",
    };
  }
}
