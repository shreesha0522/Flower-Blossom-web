import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllUsers } from "@/lib/api/admin.api";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const userDataCookie = cookieStore.get("user_data");

  if (!authToken || !userDataCookie) redirect("/login");

  let userData = null;
  try {
    userData = JSON.parse(userDataCookie.value);
    if (userData.role !== "admin") redirect("/dashboard");
  } catch {
    redirect("/login");
  }

  // Fetch real total users from API
  let totalUsers = "0";
  try {
    const usersData = await getAllUsers({ limit: 1 });
    totalUsers = String(usersData.pagination?.totalUsers || 0);
  } catch {}

  const stats = [
    { label: "Total Users", value: totalUsers, change: "Live", color: "bg-blue-50 text-blue-600" },
    { label: "Total Orders", value: "248", change: "+8%", color: "bg-green-50 text-green-600" },
    { label: "Revenue", value: "$12.5k", change: "+23%", color: "bg-indigo-50 text-indigo-600" },
    { label: "Products", value: "89", change: "+4%", color: "bg-yellow-50 text-yellow-600" },
  ];

  const quickLinks = [
    { href: "/admin/users", title: "Manage Users", desc: "View and edit all users", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
    { href: "/admin/users/create", title: "Create User", desc: "Add a new user to the system", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
    { href: "/admin/orders", title: "Manage Orders", desc: "Track all orders", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
    { href: "/admin/products", title: "Product Inventory", desc: "Manage product stock", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
    { href: "/admin/stats", title: "Analytics", desc: "View reports and statistics", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
    { href: "/admin/settings", title: "Settings", desc: "System preferences", color: "bg-gray-50 border border-gray-200 hover:bg-gray-100" },
  ];

  const recentActivity = [
    { action: "New user registered", user: "sis@gmail.com", time: "2 min ago" },
    { action: "Order #248 placed", user: "jenisha@gmail.com", time: "15 min ago" },
    { action: "Product updated", user: "admin", time: "1 hr ago" },
    { action: "New user registered", user: "tara@gmail.com", time: "2 hr ago" },
    { action: "Order #247 delivered", user: "ros@gmail.com", time: "3 hr ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      {/* Welcome Back */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back,{" "}
            <span className="text-pink-500 font-medium">
              {userData?.firstName || userData?.name || userData?.email || "Admin"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {userData?.firstName && userData?.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData?.username || "Admin"}
            </p>
            <p className="text-xs text-gray-500">{userData?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {userData?.firstName?.[0]?.toUpperCase() ||
              userData?.email?.[0]?.toUpperCase() ||
              "A"}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${stat.color}`}
              >
                {stat.label[0]}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div className={`border rounded-xl p-4 transition-all cursor-pointer ${link.color}`}>
                  <p className="text-sm font-semibold text-gray-800">{link.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.action}</p>
                  <p className="text-xs text-gray-500 truncate">{item.user}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}