"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from cookie/localStorage or fetch from API
    const fetchUserData = async () => {
      try {
        // You can fetch user data from your API here
        // For now, we'll use a placeholder
        const user = {
          name: "User",
          email: "user@example.com",
        };
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌸</span>
              <h1 className="text-xl font-bold text-pink-600">Flower Blossom</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-gray-600 hover:text-pink-600 transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  // Add logout logic here
                  router.push("/login");
                }}
                className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {userData?.name || "User"}! 🌺
          </h2>
          <p className="text-gray-600">
            Discover beautiful flowers and manage your orders
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Browse Flowers Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🌹</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Browse Flowers
            </h3>
            <p className="text-gray-600 mb-4">
              Explore our collection of beautiful flowers
            </p>
            <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
              View Catalog
            </button>
          </div>

          {/* My Orders Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              My Orders
            </h3>
            <p className="text-gray-600 mb-4">
              Track your flower deliveries
            </p>
            <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
              View Orders
            </button>
          </div>

          {/* Favorites Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              My Favorites
            </h3>
            <p className="text-gray-600 mb-4">
              Your saved flower arrangements
            </p>
            <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
              View Favorites
            </button>
          </div>

          {/* Occasions Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Special Occasions
            </h3>
            <p className="text-gray-600 mb-4">
              Set reminders for important dates
            </p>
            <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
              Manage Dates
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              My Profile
            </h3>
            <p className="text-gray-600 mb-4">
              Update your account information
            </p>
            <Link href="/profile">
              <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
                Edit Profile
              </button>
            </Link>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Support
            </h3>
            <p className="text-gray-600 mb-4">
              Need help? Contact our team
            </p>
            <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
              Get Help
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}