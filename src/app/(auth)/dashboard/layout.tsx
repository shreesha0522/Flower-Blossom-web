"use client";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount] = useState(3);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication on component mount
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (!authToken || !userData) {
      // Not logged in, redirect to login page
      router.push("/login");
      return;
    }

    // Parse and set user data
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    
    // Redirect to login
    router.push("/login");
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🌸</div>
          <p className="text-pink-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user data, don't render (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <nav className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-pink-500 font-bold text-xl">
              🌸 <span>Flower Blossom</span>
            </Link>

            <div className="hidden md:flex gap-8 text-gray-600 font-medium">
              <Link href="/dashboard" className="hover:text-pink-500 transition">
                Home
              </Link>
              <Link href="/dashboard/catalog" className="hover:text-pink-500 transition">
                Catalog
              </Link>
              <Link href="/dashboard/orders" className="hover:text-pink-500 transition">
                My Orders
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard/cart" className="relative p-2 hover:bg-pink-50 rounded-full transition">
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
                    {user.name || user.username}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-pink-100 z-50">
                    <div className="px-4 py-3 border-b border-pink-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name || user.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}