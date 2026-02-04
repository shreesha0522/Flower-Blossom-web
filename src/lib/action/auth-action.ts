/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { login, register } from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";

export type AuthResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  user?: {
    id: string;
    email: string;
    name?: string;
    role: "admin" | "user";
  };
};

// ===== HANDLE REGISTER =====
export const handleRegister = async (formData: any): Promise<AuthResponse> => {
  try {
    const res = await register(formData);

    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: res.message || "Registration successful",
      };
    }

    return {
      success: false,
      message: res.message || "Registration failed",
    };
  } catch (error: any) {
    console.error("Register error:", error);

    return {
      success: false,
      message: error.message || "Registration failed",
    };
  }
};

// ===== HANDLE LOGIN =====
export const handleLogin = async (formData: any): Promise<AuthResponse> => {
  try {
    const res = await login(formData);

    console.log("Backend login response:", res);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Login failed",
      };
    }

    // ✅ token is in res.token (your backend response)
    const token = res.token;

    if (!token) {
      return {
        success: false,
        message: "Token missing from backend response",
      };
    }

    // ✅ Save token + user in cookies
    await setAuthToken(token);
    await setUserData(res.data);

    return {
      success: true,
      data: res.data,
      message: res.message || "Login successful",
      user: {
        id: res.data?._id,
        email: res.data?.email,
        name: res.data?.username || res.data?.name,
        role: res.data?.role || "user",
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);

    return {
      success: false,
      message: error.message || "Login failed",
    };
  }
};
