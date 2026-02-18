import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const userDataCookie = cookieStore.get("user_data");

  if (!authToken || !userDataCookie) redirect("/login");

  let userData = null;
  try {
    userData = JSON.parse(userDataCookie.value);
    if (userData.role !== "admin") redirect("/dashboard");
  } catch (error) {
    redirect("/login");
  }

  const stats = [
    { label: "Total Users", value: "156", change: "+12%", icon: "👥", color: "from-pink-500 to-rose-400" },
    { label: "Total Orders", value: "248", change: "+8%", icon: "📦", color: "from-violet-500 to-purple-400" },
    { label: "Revenue", value: "$12.5k", change: "+23%", icon: "💰", color: "from-emerald-500 to-teal-400" },
    { label: "Products", value: "89", change: "+4%", icon: "🌹", color: "from-amber-500 to-orange-400" },
  ];

  const quickLinks = [
    { href: "/admin/users", icon: "👥", title: "Manage Users", desc: "View, edit and manage all registered users", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { href: "/admin/users/create", icon: "➕", title: "Create User", desc: "Add a new user to the system", color: "bg-violet-50 border-violet-200 hover:bg-violet-100" },
    { href: "#", icon: "📦", title: "Manage Orders", desc: "Track and manage all flower orders", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100" },
    { href: "#", icon: "🌺", title: "Flower Inventory", desc: "Manage flower products and stock levels", color: "bg-amber-50 border-amber-200 hover:bg-amber-100" },
    { href: "#", icon: "📊", title: "Analytics", desc: "View sales reports and statistics", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { href: "#", icon: "⚙️", title: "Settings", desc: "Configure your system preferences", color: "bg-gray-50 border-gray-200 hover:bg-gray-100" },
  ];

  const recentActivity = [
    { action: "New user registered", user: "sis@gmail.com", time: "2 min ago", icon: "👤" },
    { action: "Order #248 placed", user: "jenisha@gmail.com", time: "15 min ago", icon: "📦" },
    { action: "Product updated", user: "admin", time: "1 hr ago", icon: "🌹" },
    { action: "New user registered", user: "tara@gmail.com", time: "2 hr ago", icon: "👤" },
    { action: "Order #247 delivered", user: "ros@gmail.com", time: "3 hr ago", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back, <span className="text-pink-500 font-medium">{userData?.name || userData?.email || "Admin"}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{userData?.name || "Admin"}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {userData?.name?.[0]?.toUpperCase() || userData?.email?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute top-4 right-32 w-12 h-12 bg-white/10 rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌸</span>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Flower Blossom Admin
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">
              Good day, {userData?.name || "Admin"}!
            </h2>
            <p className="text-pink-100 text-sm">
              Here's what's happening with your store today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg shadow-sm`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <div className={`border rounded-xl p-4 transition-all cursor-pointer ${link.color}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{link.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Recent Activity
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-500 truncate">{item.user}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}