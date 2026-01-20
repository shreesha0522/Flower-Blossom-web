import axios from "./axios";
import { API } from "./endpoint";

export const getCurrentUser = async() => {
  try {
    const response = await axios.get(API.AUTH.ME);
    return response.data;
  } catch (error: any) {
    return null;
  }
}