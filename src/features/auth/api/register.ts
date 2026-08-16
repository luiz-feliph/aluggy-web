import { apiClient } from "@/lib/api-client";
import type { RegisterRequest } from "../types/types";

export async function registerUser(data: RegisterRequest) {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}
