"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllUsers, deleteUser } from "@/lib/api/admin.api";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage: string;
  createdAt: string;
}

interface Pagination {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Search + filter + pagination state
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const LIMIT = 8;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllUsers({
        page: currentPage,
        limit: LIMIT,
        search,
        role: roleFilter,
      });
      setUsers(data.data || []);
      setPagination(data.pagination || null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteUser(deleteId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      setDeleteId(null);
      // Refresh to update pagination counts
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to delete user");
      setDeleteId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getImageUrl = (profileImage: string) => {
    if (!profileImage) return null;
    if (profileImage.startsWith("/uploads")) {
      return `/api/image-proxy?url=${encodeURIComponent(
        process.env.NEXT_PUBLIC_API_BASE_URL + profileImage
      )}`;
    }
    return profileImage;
  };

  const deleteUser_ = users.find((u) => u.id === deleteId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">User Management</h1>
            <p className="text-sm text-gray-500">
              {pagination ? `${pagination.totalUsers} total users` : "Loading..."}
            </p>
          </div>
          <Link
            href="/admin/users/create"
            className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
          >
            + Create User
          </Link>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, username..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 h-10 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            />
          </div>

          {/* Role Filter */}
          <div className="flex gap-2">
            {["", "user", "admin"].map((role) => (
              <button
                key={role || "all"}
                onClick={() => handleRoleFilter(role)}
                className={`px-4 h-10 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === role
                    ? "bg-pink-500 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {role === "" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Username</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: LIMIT }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-200" />
                          <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                      </td>
                      <td className="px-5 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4 hidden sm:table-cell"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4"><div className="h-6 w-14 bg-gray-200 rounded-full" /></td>
                      <td className="px-5 py-4 hidden md:table-cell"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4"><div className="h-8 w-24 bg-gray-200 rounded" /></td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-gray-500 text-sm">No users found</p>
                      {search && (
                        <button
                          onClick={() => { setSearchInput(""); setSearch(""); }}
                          className="mt-2 text-pink-500 text-sm hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-pink-100 border border-pink-200 flex items-center justify-center flex-shrink-0">
                            {user.profileImage ? (
                              <img src={getImageUrl(user.profileImage) || ""} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-semibold text-pink-600">
                                {user.firstName?.[0] || user.email[0].toUpperCase()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "—"}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>

                      {/* Username */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="px-3 py-1.5 text-xs font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteId(user.id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">
                  {(pagination.currentPage - 1) * pagination.limit + 1}–{Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)}
                </span> of <span className="font-medium text-gray-700">{pagination.totalUsers}</span> users
              </p>

              <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ‹
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce<(number | string)[]>((acc, p, i, arr) => {
                    if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={"ellipsis-" + i} className="w-8 h-8 flex items-center justify-center text-sm text-gray-400">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p as number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          currentPage === p
                            ? "bg-pink-500 text-white shadow-sm"
                            : "text-gray-600 hover:bg-white border border-gray-200"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                {/* Next */}
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={!pagination.hasNextPage}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Delete User</h3>
            <p className="text-sm text-gray-500 text-center mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-sm font-semibold text-gray-800 text-center mb-5">
              {deleteUser_?.firstName && deleteUser_?.lastName
                ? `${deleteUser_.firstName} ${deleteUser_.lastName}`
                : deleteUser_?.email}?
            </p>
            <p className="text-xs text-red-500 text-center mb-6">
              ⚠️ This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}