import { API } from "@/lib/api/endpoint";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.split(";").find((c) => c.trim().startsWith("auth_token="));
  if (!match) return null;
  return decodeURIComponent(match.trim().split("=").slice(1).join("="));
};

export const getAllUsers = async (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  },
  token?: string
) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.role) query.set("role", params.role);

  const clientToken = token || getToken();
  const response = await fetch(`${BASE_URL}${API.ADMIN.USERS}?${query.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
    },
  });
  return response.json();
};

export const getUserById = async (id: string, token?: string) => {
  const clientToken = token || getToken();
  const response = await fetch(`${BASE_URL}${API.ADMIN.USER_BY_ID(id)}`, {
    headers: {
      "Content-Type": "application/json",
      ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
    },
  });
  return response.json();
};

export const createUser = async (formData: FormData, token?: string) => {
  const clientToken = token || getToken();
  const response = await fetch(`${BASE_URL}${API.ADMIN.USERS}`, {
    method: "POST",
    headers: {
      ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
    },
    body: formData,
  });
  return response.json();
};

export const updateUser = async (id: string, formData: FormData, token?: string) => {
  const clientToken = token || getToken();
  const response = await fetch(`${BASE_URL}${API.ADMIN.USER_BY_ID(id)}`, {
    method: "PUT",
    headers: {
      ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
    },
    body: formData,
  });
  return response.json();
};

export const deleteUser = async (id: string, token?: string) => {
  const clientToken = token || getToken();
  const response = await fetch(`${BASE_URL}${API.ADMIN.USER_BY_ID(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
    },
  });
  return response.json();
};