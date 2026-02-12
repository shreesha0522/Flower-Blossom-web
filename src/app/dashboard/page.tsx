"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoritesContext";

// Define the Flower type
interface Flower {
  id: number;
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

const flowers: Flower[] = [
  { 
    id: 1, 
    name: "Pink Rose", 
    pricePerRose: 150,
    bouquetPrice: 1500,
    originalPricePerRose: 200,
    originalBouquetPrice: 2000,
    discount: 25,
    image: "/images/flower1.png",
    description: "Fresh, handpicked pink roses with vibrant colors and long-lasting freshness. Perfect for any occasion.",
    category: "Roses"
  },
  { 
    id: 6, 
    name: "Red Rose", 
    pricePerRose: 190,
    bouquetPrice: 1900,
    originalPricePerRose: 240,
    originalBouquetPrice: 2400,
    discount: 21,
    image: "/images/flower6.png",
    description: "Classic red roses representing deep love and passion. A timeless gift choice.",
    category: "Roses"
  },
  { 
    id: 11, 
    name: "Rose and Lily", 
    pricePerRose: 170,
    bouquetPrice: 1700,
    originalPricePerRose: 170,
    originalBouquetPrice: 1700,
    discount: 0,
    image: "/images/flower3.png",
    description: "Beautiful combination of roses and lilies creating an elegant mixed bouquet.",
    category: "Roses"
  },
  { 
    id: 16, 
    name: "Pink Lily", 
    pricePerRose: 220,
    bouquetPrice: 2200,
    originalPricePerRose: 220,
    originalBouquetPrice: 2200,
    discount: 0,
    image: "/images/flower8.png",
    description: "Elegant pink lilies symbolizing prosperity and abundance.",
    category: "Roses"
  },
  { 
    id: 2, 
    name: "White and Pink Tulip", 
    pricePerRose: 200,
    bouquetPrice: 2000,
    originalPricePerRose: 200,
    originalBouquetPrice: 2000,
    discount: 0,
    image: "/images/flower2.png",
    description: "Delicate tulips in white and pink shades symbolizing purity and beauty. Ideal for celebrations and special moments.",
    category: "Lilies"
  },
  { 
    id: 14, 
    name: "White Tulip", 
    pricePerRose: 195,
    bouquetPrice: 1950,
    originalPricePerRose: 195,
    originalBouquetPrice: 1950,
    discount: 0,
    image: "/images/flower6.png",
    description: "Pure white tulips representing elegance and grace.",
    category: "Lilies"
  },
  { 
    id: 8, 
    name: "Baby's Breath", 
    pricePerRose: 240,
    bouquetPrice: 2400,
    originalPricePerRose: 240,
    originalBouquetPrice: 2400,
    discount: 0,
    image: "/images/flower8.png",
    description: "Delicate baby's breath flowers perfect for elegant events and arrangements.",
    category: "Lilies"
  },
  { 
    id: 3, 
    name: "Blue Baby's Breath", 
    pricePerRose: 180,
    bouquetPrice: 1800,
    originalPricePerRose: 220,
    originalBouquetPrice: 2200,
    discount: 18,
    image: "/images/flower3.png",
    description: "Unique blue baby's breath flowers that bring a touch of whimsy and charm to any space.",
    category: "Sale"
  },
  { 
    id: 9, 
    name: "Pastel Flower", 
    pricePerRose: 160,
    bouquetPrice: 1600,
    originalPricePerRose: 200,
    originalBouquetPrice: 2000,
    discount: 20,
    image: "/images/flower1.png",
    description: "Soft pastel flowers creating a gentle and calming arrangement.",
    category: "Sale"
  },
  { 
    id: 13, 
    name: "Cherry Blossom", 
    pricePerRose: 280,
    bouquetPrice: 2800,
    originalPricePerRose: 350,
    originalBouquetPrice: 3500,
    discount: 20,
    image: "/images/flower5.png",
    description: "Delicate cherry blossoms representing the beauty of life.",
    category: "Sale"
  },
  { 
    id: 4, 
    name: "Orchid", 
    pricePerRose: 250,
    bouquetPrice: 2500,
    originalPricePerRose: 250,
    originalBouquetPrice: 2500,
    discount: 0,
    image: "/images/flower4.png",
    description: "Exotic orchids representing luxury and elegance. A premium choice for special occasions.",
    category: "Premium"
  },
  { 
    id: 5, 
    name: "Pink Peony", 
    pricePerRose: 220,
    bouquetPrice: 2200,
    originalPricePerRose: 220,
    originalBouquetPrice: 2200,
    discount: 0,
    image: "/images/flower5.png",
    description: "Soft romantic peonies in beautiful pink shades. Perfect for weddings and celebrations.",
    category: "Premium"
  },
  { 
    id: 7, 
    name: "Spring Flower", 
    pricePerRose: 210,
    bouquetPrice: 2100,
    originalPricePerRose: 210,
    originalBouquetPrice: 2100,
    discount: 0,
    image: "/images/flower7.png",
    description: "Vibrant mix of seasonal flowers bringing color and freshness to your home.",
    category: "Premium"
  },
  { 
    id: 10, 
    name: "Garden Mix", 
    pricePerRose: 230,
    bouquetPrice: 2300,
    originalPricePerRose: 230,
    originalBouquetPrice: 2300,
    discount: 0,
    image: "/images/flower2.png",
    description: "Lively collection of garden-fresh flowers in bold beautiful colors.",
    category: "Premium"
  },
  { 
    id: 12, 
    name: "Sunset Flower", 
    pricePerRose: 260,
    bouquetPrice: 2600,
    originalPricePerRose: 260,
    originalBouquetPrice: 2600,
    discount: 0,
    image: "/images/flower4.png",
    description: "Warm orange and yellow tones reminiscent of beautiful sunsets.",
    category: "Premium"
  },
  { 
    id: 15, 
    name: "Tropical Mix", 
    pricePerRose: 270,
    bouquetPrice: 2700,
    originalPricePerRose: 270,
    originalBouquetPrice: 2700,
    discount: 0,
    image: "/images/flower7.png",
    description: "Exotic tropical flowers bringing island vibes and bold colors.",
    category: "Premium"
  },
];

// Banner slides data with Valentine's Day images
const bannerSlides = [
  {
    id: 1,
    image: "/images/banner-1.jpg",
    title: "Valentine's Day",
    subtitle: "MEGA SALE - Up to 30% OFF",
    bgColor: "bg-gradient-to-r from-pink-100 to-rose-100"
  },
  {
    id: 2,
    image: "/images/banner-2.jpg",
    title: " ",
    subtitle: " ",
    bgColor: "bg-gradient-to-r from-pink-200 to-rose-200"
  },
];

export default function DashboardPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isBouquet, setIsBouquet] = useState<boolean>(false);
  
  // Banner slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use cart and favorites context
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Auto-slide effect - changes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  // Group flowers by category
  const categorizedFlowers = useMemo(() => {
    const categories: { [key: string]: Flower[] } = {};
    flowers.forEach((flower) => {
      if (!categories[flower.category]) {
        categories[flower.category] = [];
      }
      categories[flower.category].push(flower);
    });
    return categories;
  }, []);

  // Toggle favorite
  const handleToggleFavorite = (flower: Flower, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorite(flower.id)) {
      removeFromFavorites(flower.id);
    } else {
      addToFavorites({
        id: flower.id,
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

  // Add to cart function
  const handleAddToCart = () => {
    if (!selectedFlower) return;

    const price = isBouquet ? selectedFlower.bouquetPrice : selectedFlower.pricePerRose;
    const originalPrice = isBouquet ? selectedFlower.originalBouquetPrice : selectedFlower.originalPricePerRose;

    addToCart({
      id: selectedFlower.id,
      name: `${selectedFlower.name}${isBouquet ? ' (Bouquet)' : ''}`,
      price: originalPrice,
      discountedPrice: price,
      quantity: quantity,
      isBouquet: isBouquet,
      image: selectedFlower.image,
      description: selectedFlower.description,
      discount: selectedFlower.discount,
    });
    
    alert(`Added ${quantity} ${isBouquet ? 'bouquet(s)' : 'rose(s)'} to cart!`);
    
    setSelectedFlower(null);
    setQuantity(1);
    setIsBouquet(false);
  };

  const getCurrentPrice = () => {
    if (!selectedFlower) return 0;
    return isBouquet ? selectedFlower.bouquetPrice : selectedFlower.pricePerRose;
  };

  const getOriginalPrice = () => {
    if (!selectedFlower) return 0;
    return isBouquet ? selectedFlower.originalBouquetPrice : selectedFlower.originalPricePerRose;
  };

  // Render flower card
  const renderFlowerCard = (flower: Flower) => (
    <div
      key={flower.id}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition relative"
    >
      {/* Square Image */}
      <div className="w-full aspect-square relative mb-4">
        <Image
          src={flower.image}
          alt={flower.name}
          fill
          className="object-cover rounded-lg"
        />
        
        {/* Favorite Button - Top Left Corner */}
        <button
          onClick={(e) => handleToggleFavorite(flower, e)}
          className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition z-20"
        >
          <svg 
            className="w-5 h-5" 
            fill={isFavorite(flower.id) ? "#ec4899" : "white"}
            stroke="#ec4899" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
            />
          </svg>
        </button>
        
        {/* Discount Badge - Top Right Corner - Only show if discount > 0 */}
        {flower.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md z-20">
            {flower.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-800">
        {flower.name}
      </h2>
      {/* Price */}
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <p className="text-pink-600 font-bold text-lg">
            Rs {flower.pricePerRose}
          </p>
          {flower.discount > 0 && (
            <p className="text-gray-400 line-through text-sm">
              Rs {flower.originalPricePerRose}
            </p>
          )}
        </div>
        <p className="text-gray-500 text-xs">per rose</p>
      </div>
      {/* Button */}
      <button 
        onClick={() => {
          setSelectedFlower(flower);
          setQuantity(1);
          setIsBouquet(false);
        }}
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* BANNER SLIDER */}
      <div className="relative w-full h-[400px] overflow-hidden bg-gray-100">
        {/* Slides - transition speed is now 500ms (0.5 seconds) */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative"
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-top"
                priority={slide.id === 1}
              />
              
              {/* Optional: Add overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              
              {/* Text Content - Positioned at bottom for better visibility */}
              <div className="absolute bottom-12 left-0 right-0 text-center text-white px-4 z-10">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-2xl drop-shadow-md mb-6">
                  {slide.subtitle}
                </p>
                <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content wrapper with padding */}
      <div className="p-6">
        {/* Categorized Flower Sections */}
        {Object.entries(categorizedFlowers).map(([category, categoryFlowers]) => (
          <div key={category} className="mb-12">
            {/* Category Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{category}</h2>
            
            {/* Horizontal Scrollable Row */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
                {categoryFlowers.map((flower) => (
                  <div key={flower.id} className="flex-shrink-0 w-72">
                    {renderFlowerCard(flower)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedFlower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFlower(null)}
              className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 shadow-md z-20 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* IMAGE */}
            <div className="relative h-56 bg-white rounded-t-2xl overflow-hidden">
              <Image
                src={selectedFlower.image}
                alt={selectedFlower.name}
                fill
                className="object-cover"
                priority
              />
              {selectedFlower.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-md font-semibold text-sm shadow">
                  {selectedFlower.discount}% OFF
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedFlower.name}
              </h2>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {selectedFlower.description}
              </p>

              {/* Purchase Options */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsBouquet(false)}
                    className={`p-3 rounded-lg border-2 transition ${
                      !isBouquet
                        ? 'border-pink-500 bg-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700 mb-1">Per Rose</div>
                    <div className="text-pink-600 font-bold text-lg">
                      Rs {selectedFlower.pricePerRose}
                    </div>
                    {selectedFlower.discount > 0 && (
                      <div className="text-gray-400 line-through text-xs">
                        Rs {selectedFlower.originalPricePerRose}
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setIsBouquet(true)}
                    className={`p-3 rounded-lg border-2 transition ${
                      isBouquet
                        ? 'border-pink-500 bg-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700 mb-1">Bouquet</div>
                    <div className="text-pink-600 font-bold text-lg">
                      Rs {selectedFlower.bouquetPrice}
                    </div>
                    {selectedFlower.discount > 0 && (
                      <div className="text-gray-400 line-through text-xs">
                        Rs {selectedFlower.originalBouquetPrice}
                      </div>
                    )}
                    <div className="text-[10px] text-gray-500 mt-0.5">12 pieces</div>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold w-10 h-10 rounded-lg transition"
                  >
                    −
                  </button>
                  <div className="bg-white border-2 border-gray-300 rounded-lg px-6 py-2 min-w-[80px] text-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold w-10 h-10 rounded-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-700 font-semibold">Total</span>
                    <p className="text-xs text-gray-500">
                      {quantity} {isBouquet ? 'bouquet(s)' : 'piece(s)'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-pink-600 font-bold text-2xl">
                      Rs {getCurrentPrice() * quantity}
                    </div>
                    {selectedFlower.discount > 0 && (
                      <div className="text-gray-400 line-through text-xs">
                        Rs {getOriginalPrice() * quantity}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition font-semibold shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}