"use server";

import { ProfileUpdateResponse } from "@/app/user/profile/schema";

export async function handleUpdateProfile(
  userId: string,
  formData: FormData
): Promise<ProfileUpdateResponse> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    const response = await fetch(`${apiUrl}/api/auth/${userId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
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
    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    const response = await fetch(`${apiUrl}/api/auth/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
