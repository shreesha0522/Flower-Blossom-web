"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    section: "Overview",
    links: [
      { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    ],
  },
  {
    section: "Management",
    links: [
      { href: "/admin/users", icon: "👥", label: "All Users" },
      { href: "/admin/users/create", icon: "➕", label: "Create User" },
      { href: "#orders", label: "Orders" },
      { href: "#products", label: "Products" },
      
    ],
  },
  {
    section: "Account",
    links: [
      { href: "/user/profile", icon: "👤", label: "Profile" },
      { href: "#settings", label: "Settings" },
      { href: "/admin/stats", icon: "📈", label: "Analytics" },
      
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "user_data=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 
          flex flex-col shadow-sm transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg shadow-sm">
              🌸
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Flower Blossom</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-5 overflow-y-auto">
          {navItems.map((section) => (
            <div key={section.section}>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {section.section}
              </p>
              <div className="space-y-0.5">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isActive(link.href)
                        ? "bg-pink-50 text-pink-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }
                      ${link.href === "#" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                    `}
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                    {isActive(link.href) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
              {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.username || user?.email || "Admin"}
              </p>
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">
                {user?.role || "admin"}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="text-sm font-bold text-gray-800">Flower Blossom</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
          >
            ☰
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}