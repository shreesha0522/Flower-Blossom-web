"use server";
import { ProfileUpdateResponse } from "@/app/user/profile/schema";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const getToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
};

export async function handleUpdateProfile(
  userId: string,
  formData: FormData
): Promise<ProfileUpdateResponse> {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/api/auth/${userId}`, {
      method: "PUT",
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: data.message || "Profile updated successfully",
      data: data.data || data.user,
    };
  } catch (error: any) {
    console.error("Profile update error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating profile",
    };
  }
}

export async function getCurrentUserProfile(
  userId: string
): Promise<ProfileUpdateResponse> {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/api/auth/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch profile",
      };
    }

    return {
      success: true,
      data: data.data || data.user,
    };
  } catch (error: any) {
    console.error("Fetch profile error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching profile",
    };
  }
}