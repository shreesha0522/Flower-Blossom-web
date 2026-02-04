export const runtime = "node"; // MUST be at the top of the file

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // safer than bcrypt in Next.js
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Replace with real database logic
    const users = [
      { email: "user@example.com", password: await bcrypt.hash("user123", 10), role: "user" },
      { email: "admin@example.com", password: await bcrypt.hash("admin123", 10), role: "admin" },
    ];

    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      sameSite: "strict",
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
