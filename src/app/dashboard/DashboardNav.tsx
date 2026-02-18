"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoritesContext";

export default function DashboardNav({ user }: { user: any }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let cart: any[] = [];
  let favorites = [];

  try {
    const cartContext = useCart();
    cart = cartContext?.cart || [];
  } catch (error) {
    console.error("Cart context error:", error);
  }

  try {
    const favContext = useFavorites();
    favorites = favContext?.favorites || [];
  } catch (error) {
    console.error("Favorites context error:", error);
  }

  const cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const favoritesCount = mounted ? favorites.length : 0;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-white font-bold text-xl hover:text-pink-300 transition"
          >
            <span className="text-2xl">🌸</span>
            <span className="hidden sm:inline">Flower Blossom</span>
          </Link>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className="hover:text-pink-300 transition py-1 border-b-2 border-transparent hover:border-pink-300"
            >
              Home
            </Link>
            <Link
              href="/dashboard/about"
              className="hover:text-pink-300 transition py-1 border-b-2 border-transparent hover:border-pink-300"
            >
              About Us
            </Link>
            <Link
              href="/dashboard/contact"
              className="hover:text-pink-300 transition py-1 border-b-2 border-transparent hover:border-pink-300"
            >
              Contact
            </Link>
            <Link
              href="/dashboard/orders"
              className="hover:text-pink-300 transition py-1 border-b-2 border-transparent hover:border-pink-300"
            >
              My Orders
            </Link>
            <Link
              href="/dashboard/settings"
              className="hover:text-pink-300 transition py-1 border-b-2 border-transparent hover:border-pink-300"
            >
              Settings
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/favorites"
              className="relative p-2 hover:bg-gray-900 rounded-full transition"
              title="Favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {mounted && favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard/cart"
              className="relative p-2 hover:bg-gray-900 rounded-full transition"
              title="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard/profile"
              className="p-2 hover:bg-gray-900 rounded-full transition"
              title="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}