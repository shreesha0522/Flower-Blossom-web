/* eslint-disable @typescript-eslint/no-explicit-any */
import { setAuthToken, setUserData } from "../cookie";
import axios from "./axios";
import { API } from "./endpoint";

 // 👈 your cookie functions

export const register = async (registerData: any) => {
  try {
    const response = await axios.post(API.AUTH.REGISTER, registerData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Registration Failed"
    );
  }
};

export const login = async (loginData: any) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData, {
      withCredentials: true,
    });

    // ✅ Save token + user in cookies
    const token = response.data?.data?.token;
    const user = response.data?.data;

    if (token) {
      await setAuthToken(token);
    }

    if (user) {
      await setUserData(user);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Login Failed"
    );
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(API.AUTH.ME, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Failed to fetch user"
    );
  }
};
