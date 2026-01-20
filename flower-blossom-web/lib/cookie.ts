/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

// Only keep these for reading backend-set cookies
export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null; // Changed from "auth_token" to "token" (what backend sets)
}

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}