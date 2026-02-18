"use client";
import { useState } from "react";
import { forgotPassword } from "@/lib/api/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setSuccess(true);
        setEmail("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      {error && <p className="text-sm text-red-600">{error}</p>}

      {success ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
            <p className="font-medium">Email sent successfully!</p>
            <p className="text-sm mt-1">
              Please check your inbox for the password reset link.
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-pink-400 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="shreesha@gmail.com"
              className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-md bg-pink-400 text-white text-sm font-semibold hover:bg-pink-500 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-pink-400 hover:underline"
            >
              Log in
            </Link>
          </div>
        </>
      )}
    </form>
  );
}