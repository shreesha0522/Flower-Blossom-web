/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { login, register } from "../api/auth";
import { revalidatePath } from "next/cache";

export const handleRegister = async (formData: any) => {
  try {
    const res = await register(formData);
    
    if(res.success) {
      revalidatePath("/"); // Refresh the page data
      return {
        success: true,
        data: res.data,
        message: "Registration successful"
      };
    }
    return {success: false, message: res.message || "Registration failed"};
  } catch (error: Error | any ) {
    return {success: false, message: error.message || "Registration failed"};
  }
}

export const handleLogin = async (formData: any) => {
  try {
    const res = await login(formData);
    
    if(res.success) {
      revalidatePath("/"); // Refresh the page data
      return {
        success: true,
        data: res.data,
        message: "Login successful"
      };
    }
    return {success: false, message: res.message || "Login failed"};
  } catch (error: Error | any ) {
    return {success: false, message: error.message || "Login failed"};
  }
}