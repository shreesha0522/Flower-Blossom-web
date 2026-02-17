"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUsers } from "@/lib/api/admin.api";

interface StatsData {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentUsers: any[];
  latestUser: any;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all users + admin users + recent users in parallel
        const [allData, adminData, recentData] = await Promise.all([
          getAllUsers({ limit: 1 }),
          getAllUsers({ limit: 1, role: "admin" }),
          getAllUsers({ limit: 5, page: 1 }),
        ]);

        setStats({
          totalUsers: allData.pagination?.totalUsers || 0,
          adminUsers: adminData.pagination?.totalUsers || 0,
          regularUsers: (allData.pagination?.totalUsers || 0) - (adminData.pagination?.totalUsers || 0),
          recentUsers: recentData.data || [],
          latestUser: recentData.data?.[0] || null,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading stats...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: "👥",
      color: "from-pink-500 to-rose-400",
      bg: "bg-pink-50",
      link: "/admin/users",
    },
    {
      label: "Admin Users",
      value: stats?.adminUsers || 0,
      icon: "🔑",
      color: "from-violet-500 to-purple-400",
      bg: "bg-violet-50",
      link: "/admin/users?role=admin",
    },
    {
      label: "Regular Users",
      value: stats?.regularUsers || 0,
      icon: "👤",
      color: "from-emerald-500 to-teal-400",
      bg: "bg-emerald-50",
      link: "/admin/users?role=user",
    },
    {
      label: "New This Week",
      value: stats?.recentUsers?.length || 0,
      icon: "✨",
      color: "from-amber-500 to-orange-400",
      bg: "bg-amber-50",
      link: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">User Analytics</h1>
            <p className="text-sm text-gray-500">Overview of your user base</p>
          </div>
          <Link
            href="/admin/users/create"
            className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-colors"
          >
            + Add User
          </Link>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link key={card.label} href={card.link}>
              <div className={`${card.bg} rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg mb-3 shadow-sm`}>
                  {card.icon}
                </div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <p className="text-xs text-gray-500 mt-1">{card.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* User Role Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Role Distribution</h2>
          <div className="space-y-3">
            {/* Admin bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Admin Users</span>
                <span>{stats?.adminUsers} / {stats?.totalUsers}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-700"
                  style={{ width: stats?.totalUsers ? `${(stats.adminUsers / stats.totalUsers) * 100}%` : "0%" }}
                />
              </div>
            </div>
            {/* Regular users bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Regular Users</span>
                <span>{stats?.regularUsers} / {stats?.totalUsers}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: stats?.totalUsers ? `${(stats.regularUsers! / stats.totalUsers) * 100}%` : "0%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recently Added Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Recently Added Users</h2>
            <Link href="/admin/users" className="text-xs text-pink-500 hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats?.recentUsers.map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-sm font-semibold text-pink-600 flex-shrink-0">
                  {user.firstName?.[0] || user.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.role === "admin" ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {user.role}
                  </span>
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/users/create">
            <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl p-5 text-white hover:shadow-lg transition-shadow cursor-pointer">
              <span className="text-2xl">➕</span>
              <p className="text-sm font-bold mt-2">Create New User</p>
              <p className="text-xs text-pink-100 mt-0.5">Add a user to the system</p>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="bg-gradient-to-br from-violet-500 to-purple-400 rounded-xl p-5 text-white hover:shadow-lg transition-shadow cursor-pointer">
              <span className="text-2xl">👥</span>
              <p className="text-sm font-bold mt-2">Manage Users</p>
              <p className="text-xs text-violet-100 mt-0.5">View and edit all users</p>
            </div>
          </Link>
          <Link href="/admin/dashboard">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl p-5 text-white hover:shadow-lg transition-shadow cursor-pointer">
              <span className="text-2xl">📊</span>
              <p className="text-sm font-bold mt-2">Dashboard</p>
              <p className="text-xs text-emerald-100 mt-0.5">Back to main dashboard</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}