"use server";
import { RegisterFormData } from "@/schemas";
import { api } from "@/services/api";

export async function registerNewTenant(formData: RegisterFormData) {
  try {
    const { data } = await api.post("/admin/register", formData);
    return data;
  } catch (err) {
    console.log("action registerNewTenant", err);
    return null;
  }
}
