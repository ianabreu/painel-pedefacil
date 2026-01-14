"use server";

import { getCookieServer } from "@/lib/cookieServer";
import { api } from "./api";
import { Category } from "@/types/category";
import { Pagination } from "@/types/pagination";

export async function getCategories() {
  const cookie = await getCookieServer();
  const { data } = await api.get<Pagination<Category>>("/private/category", {
    headers: { Authorization: "Bearer " + cookie },
  });
  return data;
}
