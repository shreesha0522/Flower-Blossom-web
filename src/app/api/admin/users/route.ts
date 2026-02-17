import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// GET /api/admin/users - Get all users with pagination
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // ✅ Forward all query params (page, limit, search, role)
    const searchParams = req.nextUrl.searchParams.toString();
    const url = API + "/api/admin/users" + (searchParams ? "?" + searchParams : "");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/users - Create user
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const formData = await req.formData();

    const response = await fetch(API + "/api/admin/users", {
      method: "POST",
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}