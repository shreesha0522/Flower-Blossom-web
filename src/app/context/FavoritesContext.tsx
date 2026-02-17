"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  image?: string;
  description?: string;
  discount?: number;
  pricePerRose?: number;
  bouquetPrice?: number;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }
  }, [favorites, mounted]);

  const addToFavorites = (product: FavoriteProduct) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === product.id);
      if (exists) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}