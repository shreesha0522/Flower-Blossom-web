"use client";
import { Product, useCart } from "@/app/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.discountedPrice || item.price) * (item.quantity || 1), 0);
  const delivery = cart.length > 0 ? 100 : 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item: Product, index: number) => (
              <div
                key={`${item.id}-${item.isBouquet}-${index}`}
                className="bg-white rounded-xl p-6 flex gap-6 border border-pink-100 shadow-sm"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-4xl">💐</span>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  {item.isBouquet && (
                    <p className="text-xs text-gray-500 mb-2">Bouquet (12 pieces)</p>
                  )}
                  <p className="text-pink-500 font-bold text-lg mb-3">
                    Rs {(item.discountedPrice || item.price).toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-pink-200 rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="text-gray-600 hover:text-pink-500 w-6 h-6 font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="text-gray-600 hover:text-pink-500 w-6 h-6 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-800">
                    Rs {((item.discountedPrice || item.price) * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">Rs {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-medium">Rs {delivery.toLocaleString()}</span>
              </div>
              <hr className="border-pink-100" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span className="text-pink-500">Rs {total.toLocaleString()}</span>
              </div>
            </div>

            {cart.length > 0 && (
              <>
                <Link
                  href="/dashboard/checkout"
                  className="block w-full py-3 px-4 bg-pink-500 text-white text-center rounded-full hover:bg-pink-600 transition font-semibold mb-3"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full py-3 px-4 border border-pink-300 text-pink-600 text-center rounded-full hover:bg-pink-50 transition font-medium mb-2"
                >
                  Clear Cart
                </button>
              </>
            )}
            <Link
              href="/dashboard"
              className="block w-full py-3 px-4 border border-pink-300 text-pink-600 text-center rounded-full hover:bg-pink-50 transition font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}