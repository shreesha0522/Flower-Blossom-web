"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct } from "@/lib/api/product.api";

export default function AdminCreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerRose: "",
    bouquetPrice: "",
    originalPricePerRose: "",
    originalBouquetPrice: "",
    discount: "0",
    category: "Roses",
    inStock: "true",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("pricePerRose", formData.pricePerRose);
      data.append("bouquetPrice", formData.bouquetPrice);
      data.append("originalPricePerRose", formData.originalPricePerRose);
      data.append("originalBouquetPrice", formData.originalBouquetPrice);
      data.append("discount", formData.discount);
      data.append("category", formData.category);
      data.append("inStock", formData.inStock);
      if (imageFile) data.append("image", imageFile);
      await createProduct(data);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
            <p className="text-sm text-gray-500">Create a new flower product</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex items-center justify-center flex-shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">🌸</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Pink Rose"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe the flower..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            >
              <option value="Roses">Roses</option>
              <option value="Lilies">Lilies</option>
              <option value="Sale">Sale</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price Per Rose (Rs) *</label>
              <input
                type="number"
                name="pricePerRose"
                value={formData.pricePerRose}
                onChange={handleChange}
                required
                placeholder="150"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bouquet Price (Rs) *</label>
              <input
                type="number"
                name="bouquetPrice"
                value={formData.bouquetPrice}
                onChange={handleChange}
                required
                placeholder="1500"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price/Rose (Rs) *</label>
              <input
                type="number"
                name="originalPricePerRose"
                value={formData.originalPricePerRose}
                onChange={handleChange}
                required
                placeholder="200"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Original Bouquet Price (Rs) *</label>
              <input
                type="number"
                name="originalBouquetPrice"
                value={formData.originalBouquetPrice}
                onChange={handleChange}
                required
                placeholder="2000"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Discount & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="0"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Status</label>
              <select
                name="inStock"
                value={formData.inStock}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/admin/products"
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}