"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/app/context/CartContext";
import { FavoritesProvider } from "@/app/context/FavoritesContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </CartProvider>
  );
}