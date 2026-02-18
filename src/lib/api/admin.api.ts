import axiosInstance from "@/lib/api/axiosInstance";

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
    "/api/admin/users?" + query.toString()
  );
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get("/api/admin/users/" + id);
  return response.data;
};

export const createUser = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/admin/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateUser = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put("/api/admin/users/" + id, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete("/api/admin/users/" + id);
  return response.data;
};
