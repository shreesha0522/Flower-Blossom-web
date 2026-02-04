"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Product type
export type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number; // optional discounted price
  quantity?: number;        // optional quantity in cart
};

// Cart context type
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Add product to cart
  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        // If product exists, increase quantity
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + qty } : p
        );
      }
      // If new product, add to cart
      return [...prev, { ...product, quantity: qty }];
    });
  };

  // Remove product from cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Update product quantity
  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return; // prevent invalid quantity
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
