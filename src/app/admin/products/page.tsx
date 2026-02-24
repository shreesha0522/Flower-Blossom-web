"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getAllProducts, deleteProduct } from "@/lib/api/product.api";

interface Product {
  _id: string;
  name: string;
  description: string;
  pricePerRose: number;
  bouquetPrice: number;
  originalPricePerRose: number;
  originalBouquetPrice: number;
  discount: number;
  category: string;
  image: string;
  inStock: boolean;
  createdAt: string;
}

interface Pagination {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 8;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllProducts({
        page: currentPage,
        limit: LIMIT,
        search,
        category: categoryFilter,
      });
      setProducts(data.data || []);
      setPagination(data.pagination || null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to delete product");
      setDeleteId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteProduct_ = products.find((p) => p._id === deleteId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Product Management</h1>
            <p className="text-sm text-gray-500">
              {pagination ? `${pagination.totalProducts} total products` : "Loading..."}
            </p>
          </div>
          <Link
            href="/admin/products/create"
            className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 h-10 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["", "Roses", "Lilies", "Sale", "Premium"].map((cat) => (
              <button
                key={cat || "all"}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-4 h-10 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === cat
                    ? "bg-pink-500 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat === "" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Price/Rose</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Bouquet</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: LIMIT }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                          <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                      </td>
                      <td className="px-5 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4 hidden sm:table-cell"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4 hidden md:table-cell"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                      <td className="px-5 py-4"><div className="h-6 w-14 bg-gray-200 rounded-full" /></td>
                      <td className="px-5 py-4"><div className="h-6 w-14 bg-gray-200 rounded-full" /></td>
                      <td className="px-5 py-4"><div className="h-8 w-24 bg-gray-200 rounded" /></td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="text-4xl mb-2">🌸</div>
                      <p className="text-gray-500 text-sm">No products found</p>
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
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                            {product.image ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">🌸</div>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <p className="text-sm text-gray-600">Rs {product.pricePerRose}</p>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-sm text-gray-600">Rs {product.bouquetPrice}</p>
                      </td>
                      <td className="px-5 py-4">
                        {product.discount > 0 ? (
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                            {product.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}>
                          {product.inStock ? "In Stock" : "Out"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="px-3 py-1.5 text-xs font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteId(product._id)}
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

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">
                  {(pagination.currentPage - 1) * pagination.limit + 1}–{Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)}
                </span> of <span className="font-medium text-gray-700">{pagination.totalProducts}</span> products
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  &lsaquo;
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-pink-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-white border border-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={!pagination.hasNextPage}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-600 hover:bg-white border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  &rsaquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Delete Product</h3>
            <p className="text-sm text-gray-500 text-center mb-1">Are you sure you want to delete</p>
            <p className="text-sm font-semibold text-gray-800 text-center mb-5">{deleteProduct_?.name}?</p>
            <p className="text-xs text-red-500 text-center mb-6">This action cannot be undone.</p>
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