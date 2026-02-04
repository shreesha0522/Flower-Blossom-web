"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNav({ user }: { user: any }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount] = useState(3);

  const handleLogout = async () => {
    try {
      // Call logout API to clear cookie
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-pink-500 font-bold text-xl"
          >
            🌸 <span>Flower Blossom</span>
          </Link>

          <div className="hidden md:flex gap-8 text-gray-600 font-medium">
            <Link
              href="/dashboard"
              className="hover:text-pink-500 transition"
            >
              Home
            </Link>
            <Link
              href="/dashboard/catalog"
              className="hover:text-pink-500 transition"
            >
              Catalog
            </Link>
            <Link
              href="/dashboard/orders"
              className="hover:text-pink-500 transition"
            >
              My Orders
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/cart"
              className="relative p-2 hover:bg-pink-50 rounded-full transition"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 hover:bg-pink-50 rounded-full transition"
              >
                <span className="text-2xl">👤</span>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user.name || user.email?.split("@")[0]}
                </span>
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-pink-100 z-50">
                    <div className="px-4 py-3 border-b border-pink-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name || user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      📦 Orders
                    </Link>
                    <hr className="my-2 border-pink-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-pink-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}