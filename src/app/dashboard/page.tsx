"use client";
import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoritesContext";
import axiosInstance from "@/lib/api/axiosInstance";
import { API } from "@/lib/api/endpoint";

interface Flower {
  id: number | string;
  name: string;
  pricePerRose: number;
  bouquetPrice: number;
  originalPricePerRose: number;
  originalBouquetPrice: number;
  image: string;
  description: string;
  discount: number;
  category: string;
}

const getDefaultImage = (name: string, category: string) => {
  const nameImages: { [key: string]: string } = {
    "Pink Rose": "/images/flower1.png",
    "Red Rose": "/images/flower2.png",
    "Rose and Lily": "/images/flower3.png",
    "Pink Lily": "/images/flower4.png",
    "White and Pink Tulip": "/images/flower5.png",
    "White Tulip": "/images/flower6.png",
    "Baby's Breath": "/images/flower7.png",
    "Blue Baby's breath": "/images/flower8.png",
    "Pastel Flower": "/images/flower9.png",
    "Cherry Blossom": "/images/flower10.png",
    "Orchid": "/images/flower11.png",
    "Pink Peony": "/images/flower12.png",
    "Spring Flower": "/images/flower13.png",
    "Garden Mix": "/images/flower14.png",
    "Sunset Flower": "/images/flower15.png",
    "Tropical Mix": "/images/flower16.png",
  };
  const categoryImages: { [key: string]: string } = {
    Roses: "/images/flower1.png",
    Lilies: "/images/flower2.png",
    Sale: "/images/flower3.png",
    Premium: "/images/flower4.png",
  };
  return nameImages[name] || categoryImages[category] || "/images/flower1.png";
};

const bannerSlides = [
  { id: 1, image: "/images/banners-1.jpg", title: "Valentine's Day", subtitle: "MEGA SALE - Up to 30% OFF" },
  { id: 2, image: "/images/banners-2.jpg", title: " ", subtitle: " " },
];

const CATEGORIES = ["All", "Roses", "Lilies", "Sale", "Premium"];

export default function DashboardPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isBouquet, setIsBouquet] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API.PRODUCTS.GET_ALL, {
        params: { limit: 100, search, category: activeCategory === "All" ? "" : activeCategory },
      });
      const data = res.data?.data || [];
      const mapped: Flower[] = data.map((p: any) => ({
        id: p._id,
        name: p.name,
        pricePerRose: p.pricePerRose,
        bouquetPrice: p.bouquetPrice,
        originalPricePerRose: p.originalPricePerRose,
        originalBouquetPrice: p.originalBouquetPrice,
        image: p.image && p.image !== ""
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${p.image}`
          : getDefaultImage(p.name, p.category),
        description: p.description,
        discount: p.discount,
        category: p.category,
      }));
      setFlowers(mapped);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % bannerSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const categorizedFlowers = useMemo(() => {
    if (activeCategory !== "All") return { [activeCategory]: flowers };
    const categories: { [key: string]: Flower[] } = {};
    flowers.forEach((f) => {
      if (!categories[f.category]) categories[f.category] = [];
      categories[f.category].push(f);
    });
    return categories;
  }, [flowers, activeCategory]);

  const handleToggleFavorite = (flower: Flower, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(flower.id as number)) {
      removeFromFavorites(flower.id as number);
    } else {
      addToFavorites({
        id: flower.id as number,
        name: flower.name,
        price: flower.originalPricePerRose,
        discountedPrice: flower.pricePerRose,
        image: flower.image,
        description: flower.description,
        discount: flower.discount,
        pricePerRose: flower.pricePerRose,
        bouquetPrice: flower.bouquetPrice,
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedFlower) return;
    const price = isBouquet ? selectedFlower.bouquetPrice : selectedFlower.pricePerRose;
    const originalPrice = isBouquet ? selectedFlower.originalBouquetPrice : selectedFlower.originalPricePerRose;
    addToCart({
      id: selectedFlower.id as number,
      name: `${selectedFlower.name}${isBouquet ? " (Bouquet)" : ""}`,
      price: originalPrice,
      discountedPrice: price,
      quantity,
      isBouquet,
      image: selectedFlower.image,
      description: selectedFlower.description,
      discount: selectedFlower.discount,
    });
    alert(`Added ${quantity} ${isBouquet ? "bouquet(s)" : "rose(s)"} to cart!`);
    setSelectedFlower(null);
    setQuantity(1);
    setIsBouquet(false);
  };

  const getCurrentPrice = () => !selectedFlower ? 0 : isBouquet ? selectedFlower.bouquetPrice : selectedFlower.pricePerRose;
  const getOriginalPrice = () => !selectedFlower ? 0 : isBouquet ? selectedFlower.originalBouquetPrice : selectedFlower.originalPricePerRose;

  const renderFlowerCard = (flower: Flower) => (
    <div
      key={flower.id as number}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 relative overflow-hidden group"
    >
      {flower.discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          -{flower.discount}%
        </div>
      )}
      <button
        onClick={(e) => handleToggleFavorite(flower, e)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill={isFavorite(flower.id as number) ? "#ef4444" : "none"} stroke="#ef4444" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      <div className="relative w-full aspect-square bg-gray-50">
        <Image src={flower.image} alt={flower.name} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">{flower.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-pink-600 font-bold text-base">Rs {flower.pricePerRose}</span>
          {flower.discount > 0 && (
            <span className="text-gray-400 line-through text-xs">Rs {flower.originalPricePerRose}</span>
          )}
        </div>
        <p className="text-gray-400 text-xs mb-3">per rose</p>
        <button
          onClick={() => { setSelectedFlower(flower); setQuantity(1); setIsBouquet(false); }}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm py-1.5 rounded transition font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative w-full h-[280px] sm:h-[380px] overflow-hidden bg-gray-200">
        <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {bannerSlides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <Image src={slide.image} alt={slide.title} fill className="object-cover object-center" priority={slide.id === 1} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white z-10">
                <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">{slide.title}</h1>
                <p className="text-base sm:text-lg drop-shadow-md mt-1">{slide.subtitle}</p>
                {slide.title.trim() && (
                  <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded font-semibold transition text-sm shadow-lg">
                    Shop Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setCurrentSlide((p) => (p - 1 + bannerSlides.length) % bannerSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => setCurrentSlide((p) => (p + 1) % bannerSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {bannerSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${currentSlide === i ? "bg-white w-5" : "bg-white/50 w-1.5"}`} />
          ))}
        </div>
      </div>

      {/* Sticky Category + Search bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex gap-1 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat ? "bg-pink-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative flex-shrink-0 w-56">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input type="text" placeholder="Search flowers..." value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-8 h-9 rounded-full border border-gray-200 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 bg-gray-50" />
              {searchInput && (
                <button onClick={() => { setSearchInput(""); setSearch(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-lg" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-7 bg-gray-200 rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : flowers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <div className="text-5xl mb-3">🌸</div>
            <p className="text-gray-500 font-medium">
              {search ? `No flowers found for "${search}"` : "No products available"}
            </p>
            {search && (
              <button onClick={() => { setSearchInput(""); setSearch(""); }}
                className="mt-3 text-pink-500 text-sm hover:underline">Clear search</button>
            )}
          </div>
        ) : (
          Object.entries(categorizedFlowers).map(([category, categoryFlowers]) => (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-pink-500 rounded-full" />
                  <h2 className="text-lg font-bold text-gray-800">{category}</h2>
                  <span className="text-sm text-gray-400">({categoryFlowers.length} items)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categoryFlowers.map((flower) => renderFlowerCard(flower))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedFlower && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFlower(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{selectedFlower.name}</h2>
              <button onClick={() => setSelectedFlower(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition text-lg">✕</button>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-56 h-56 bg-gray-50 flex-shrink-0">
                <Image src={selectedFlower.image} alt={selectedFlower.name} fill className="object-cover" priority />
                {selectedFlower.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    -{selectedFlower.discount}%
                  </div>
                )}
              </div>
              <div className="flex-1 p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{selectedFlower.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-pink-600 font-bold text-2xl">
                    Rs {isBouquet ? selectedFlower.bouquetPrice : selectedFlower.pricePerRose}
                  </span>
                  {selectedFlower.discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      Rs {isBouquet ? selectedFlower.originalBouquetPrice : selectedFlower.originalPricePerRose}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setIsBouquet(false)}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition ${!isBouquet ? "border-pink-500 bg-pink-50 text-pink-600" : "border-gray-200 text-gray-600"}`}>
                    Per Rose
                  </button>
                  <button onClick={() => setIsBouquet(true)}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition ${isBouquet ? "border-pink-500 bg-pink-50 text-pink-600" : "border-gray-200 text-gray-600"}`}>
                    Bouquet
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold">−</button>
                    <span className="w-10 text-center font-semibold text-gray-800">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total ({quantity} {isBouquet ? "bouquet(s)" : "piece(s)"})</p>
                <p className="text-pink-600 font-bold text-xl">Rs {getCurrentPrice() * quantity}</p>
                {selectedFlower.discount > 0 && (
                  <p className="text-gray-400 line-through text-xs">Rs {getOriginalPrice() * quantity}</p>
                )}
              </div>
              <button onClick={handleAddToCart}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2.5 rounded-lg font-semibold transition shadow-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}