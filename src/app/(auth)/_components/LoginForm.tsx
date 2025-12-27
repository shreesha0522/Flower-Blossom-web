"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: LoginData) => {
    startTransition(async () => {
      // Simulate login request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard
      router.push("/dashboard");
    });
    console.log("login", values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      
      {/* Email Input */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="shreesha@gmail.com"
          {...register("email")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.email?.message && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      {/* Password Input */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="*****"
          {...register("password")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.password?.message && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-pink-400 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Logging in..." : "Log in"}
      </button>

      {/* Signup Link */}
      <p className="mt-2 text-center text-sm text-gray-600">
        Don't have an account? <Link href="/register" className="font-semibold text-pink-400 hover:underline">Sign up</Link>
      </p>
    </form>
  );
}
