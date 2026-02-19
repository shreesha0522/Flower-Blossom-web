import axiosInstance from "@/lib/api/axiosInstance";
import { API } from "@/lib/api/endpoint";

export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.role) query.set("role", params.role);

  const response = await axiosInstance.get(
    `${API.ADMIN.USERS}?${query.toString()}`
  );
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(API.ADMIN.USER_BY_ID(id));
  return response.data;
};

export const createUser = async (formData: FormData) => {
  const response = await axiosInstance.post(API.ADMIN.USERS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateUser = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put(API.ADMIN.USER_BY_ID(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(API.ADMIN.USER_BY_ID(id));
  return response.data;
};