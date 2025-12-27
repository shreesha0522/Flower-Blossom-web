"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const submit = async (values: RegisterData) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/login");
    });
    console.log("register", values);
  };

  return (
    <form className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto" onSubmit={handleSubmit(submit)}>
      
      {/* Full Name */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-sm font-medium">Full name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="shreesha"
          {...register("name")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.name?.message && <span className="text-xs text-red-600">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="shreesha@example.com"
          {...register("email")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.email?.message && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="*****"
          {...register("password")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.password?.message && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="*****"
          {...register("confirmPassword")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.confirmPassword?.message && <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-pink-400 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Registering..." : "Register"}
      </button>

      {/* Login Link */}
      <p className="mt-2 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-pink-400 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
/////