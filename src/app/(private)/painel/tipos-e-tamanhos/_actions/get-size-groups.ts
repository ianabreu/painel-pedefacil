"use server";

import { ApiResponse } from "@/@types/ApiResponse";
import { SizeGroup } from "@/@types/Size";
import { generateTag } from "@/constants/generateTag";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api";
import { decrypt, getToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getSizeGroups(): Promise<ApiResponse<SizeGroup[]>> {
  const token = await getToken();
  if (!token) redirect(ROUTES.LOGIN);

  const { storeId } = decrypt(token);

  const endpoint = `/admin/size-groups`;
  try {
    const sizeGroups = await apiClient<SizeGroup[]>(endpoint, {
      token,
      cache: "force-cache",
      next: {
        tags: [generateTag.sizeGroups(storeId)],
        revalidate: 3600,
      },
    });
    return { success: true, data: sizeGroups };
  } catch {
    return {
      success: false,
      error:
        "Falha ao carregar os tipos de tamanho. Tente novamente mais tarde.",
    };
  }
}
