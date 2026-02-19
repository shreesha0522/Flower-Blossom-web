import axiosInstance from "@/lib/api/axiosInstance";
import { API } from "@/lib/api/endpoint";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await axiosInstance.post(API.AUTH.REGISTER, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(API.AUTH.LOGIN, data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get(API.AUTH.ME);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post(API.AUTH.FORGOT_PASSWORD, { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post(
    `${API.AUTH.RESET_PASSWORD}/${token}`,
    { newPassword }
  );
  return response.data;
};