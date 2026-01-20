/* eslint-disable @typescript-eslint/no-explicit-any */
// Note: Actual backend API calls
import axios from "./axios";
import { API } from "./endpoint";

export const register = async(registerData: any) => {
  try {
    const response = await axios.post(API.AUTH.REGISTER, registerData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message
      || error.message
      || "Registration Failed"
    )
  }
}

export const login = async(loginData: any) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message
      || error.message
      || "Login Failed"
    )
  }
}

// NEW FUNCTION: Get current user from cookie
export const getCurrentUser = async() => {
  try {
    const response = await axios.get(API.AUTH.ME);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message
      || error.message
      || "Failed to get user data"
    )
  }
}