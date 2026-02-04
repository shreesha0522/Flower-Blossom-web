<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { RegisterData, registerSchema } from "../schema";
import { handleRegister } from "@/lib/action/auth-action";
=======
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
>>>>>>> origin/main

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
<<<<<<< HEAD
  const [error, setError] = useState("");
=======
>>>>>>> origin/main

  const {
    register,
    handleSubmit,
<<<<<<< HEAD
    formState: { errors },
=======
    formState: { errors, isSubmitting },
>>>>>>> origin/main
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

<<<<<<< HEAD
  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await handleRegister(data);
      if (!res.success) {
        throw new Error(res.message || "Registration failed");
      }
      startTransition(() => {
        router.push("/login");
      });
    } catch (err: Error | any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">
          Full name
        </label>
=======
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
>>>>>>> origin/main
        <input
          id="name"
          type="text"
          autoComplete="name"
<<<<<<< HEAD
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("name")}
          placeholder="Shreesha Shrestha"
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("username")}
          placeholder="shreesha123"
        />
        {errors.username && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
=======
          placeholder="shreesha"
          {...register("name")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.name?.message && <span className="text-xs text-red-600">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
>>>>>>> origin/main
        <input
          id="email"
          type="email"
          autoComplete="email"
<<<<<<< HEAD
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("email")}
          placeholder="shreesha@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
=======
          placeholder="shreesha@example.com"
          {...register("email")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.email?.message && <span className="text-xs text-red-600">{errors.email.message}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
>>>>>>> origin/main
        <input
          id="password"
          type="password"
          autoComplete="new-password"
<<<<<<< HEAD
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("password")}
          placeholder="••••••"
        />
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirm password
        </label>
=======
          placeholder="*****"
          {...register("password")}
          className="px-3 h-10 w-full rounded-md border border-gray-300 bg-gray-50 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
        />
        {errors.password?.message && <span className="text-xs text-red-600">{errors.password.message}</span>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
>>>>>>> origin/main
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
<<<<<<< HEAD
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("confirmPassword")}
          placeholder="••••••"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="h-10 w-full rounded-md bg-pink-400 text-white text-sm font-semibold hover:bg-pink-500 disabled:opacity-60"
      >
        {pending ? "Registering..." : "Register"}
      </button>

      {/* Login link */}
      <div className="mt-1 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
}
=======
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
>>>>>>> origin/main
