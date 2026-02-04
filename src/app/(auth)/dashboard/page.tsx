"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, Product as CartProduct } from "../../context/CartContext";

type Product = CartProduct & {
  description: string;
  badge?: string;
  image: string;
};

// Product data
const products: Product[] = [
  {
    id: 1,
    name: "Pink Rose",
    description: "A beautiful pink rose bouquet, perfect for expressing love and gratitude.",
    price: 2500,
    discountedPrice: 2000,
    badge: "NEW",
    image: "/images/flower1.png",
  },
  {
    id: 2,
    name: "Red Rose",
    description: "Classic red roses, ideal for romantic gestures.",
    price: 3700,
    image: "/images/flower2.png",
  },
  {
    id: 3,
    name: "Lilly",
    description: "Elegant lilly bouquet for special occasions.",
    price: 3200,
    discountedPrice: 2800,
    image: "/images/flower3.png",
  },
  {
    id: 4,
    name: "Pink Lilly",
    description: "Soft pink lilly flowers to brighten anyone's day.",
    price: 3600,
    image: "/images/flower4.png",
  },
  {
    id: 5,
    name: "Pink Tulip",
    description: "Cheerful pink tulips with a delicate fragrance.",
    price: 4000,
    discountedPrice: 3500,
    badge: "SALE",
    image: "/images/flower5.png",
  },
  {
    id: 6,
    name: "White Tulip",
    description: "Pure white tulips, perfect for celebrations and gifts.",
    price: 2800,
    image: "/images/flower6.png",
  },
];

export default function DashboardPage() {
  const { addToCart } = useCart(); // Use CartContext
  const [message, setMessage] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        discountedPrice: product.discountedPrice,
      },
      qty
    );
    setMessage(`${qty} x ${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Flower Blossom</h1>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Discover our beautiful collection of fresh flowers, perfect for every occasion.
        </p>
        <Link
          href="/dashboard/catalog"
          className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
        >
          Browse Collection →
        </Link>
      </div>

      {/* Notification */}
      {message && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded shadow-lg z-50 text-center">
          {message}
        </div>
      )}

      {/* Product Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Bouquets</h2>
          <Link href="/dashboard/catalog" className="text-pink-500 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-pink-100"
            >
              {/* Product Image */}
              <div
                className="relative h-64 bg-pink-50 cursor-pointer"
                onClick={() => openModal(product)}
              >
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    {product.badge}
                  </span>
                )}
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  {product.discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        Rs {product.price.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-pink-500">
                        Rs {product.discountedPrice.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-pink-500">
                      Rs {product.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm text-green-600">✓ In Stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>

            <div className="relative h-64 mb-4">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              {selectedProduct.discountedPrice ? (
                <>
                  <span className="text-gray-400 line-through">
                    Rs {selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-pink-500">
                    Rs {selectedProduct.discountedPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-pink-500">
                  Rs {selectedProduct.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-4 gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-full hover:bg-pink-50"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-full hover:bg-pink-50"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(selectedProduct, quantity)}
                className="flex-1 py-2 px-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition text-sm font-medium"
              >
                🛒 Add to Cart
              </button>
              <button className="p-2 border border-pink-300 rounded-full hover:bg-pink-50 transition text-pink-500">
                ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
