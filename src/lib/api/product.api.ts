import axiosInstance from "@/lib/api/axiosInstance";
import { API } from "@/lib/api/endpoint";

export const getAllProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.category) query.set("category", params.category);
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.order) query.set("order", params.order);
  const response = await axiosInstance.get(
    `${API.PRODUCTS.GET_ALL}?${query.toString()}`
  );
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosInstance.get(API.PRODUCTS.GET_BY_ID(id));
  return response.data;
};

export const createProduct = async (formData: FormData) => {
  const response = await axiosInstance.post(API.PRODUCTS.CREATE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put(API.PRODUCTS.UPDATE(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(API.PRODUCTS.DELETE(id));
  return response.data;
};