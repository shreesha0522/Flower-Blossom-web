"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(token, formData.newPassword);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
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
            <p className="font-medium">Password reset successful!</p>
            <p className="text-sm mt-1">Redirecting to login page...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              required
              minLength={6}
              placeholder="*****"
              className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              Must be at least 6 characters
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              minLength={6}
              placeholder="*****"
              className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-md bg-pink-400 text-white text-sm font-semibold hover:bg-pink-500 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
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