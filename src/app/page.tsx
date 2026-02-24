"use client";
import Image from "next/image";
import { useState } from "react";

const CONTACT_SETTINGS = {
  contact: {
    address: {
      street: "123 Flower Street",
      city: "Blossom City",
      state: "BC",
      zip: "12345",
    },
    phone: {
      main: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 765-4321"
    },
    email: {
      info: "info@flowerblossom.com",
    },
    hours: {
      weekday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    }
  },
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage",
    pinterest: "https://pinterest.com/yourpage"
  }
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setLoading(false);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('redirectAfterLogin', '/dashboard');
      }
      window.location.href = '/login';
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full">
        <nav className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto">
         <div className="flex items-center gap-2">
  <Image src="/logo.png" alt="Flower Blossom Logo" width={220} height={40} className="object-contain" />
</div>
          <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
            <li className="hover:text-pink-500 cursor-pointer">Home</li>
            <li className="hover:text-pink-500 cursor-pointer">
              <a href="#new-arrivals">New Arrivals</a>
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              <a href="#collections">Collections</a>
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              <a href="#about">About Us</a>
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="flex gap-3">
            <a
              href="/login"
              className="px-5 py-2 border border-pink-400 text-pink-500 rounded-full hover:bg-pink-50"
            >
              Log In
            </a>
            <a
              href="/register"
              className="px-5 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              Sign Up
            </a>
          </div>
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-10 py-16 max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Fresh <br /> Flower Blossom
            </h1>
            <p className="mt-4 text-gray-600 max-w-md">
              Discover beautiful, fresh, and hand-picked flowers perfect for
              every occasion. Make every moment special with our collections.
            </p>
            <button className="mt-6 px-8 py-3 border border-pink-400 text-pink-500 rounded-full hover:bg-pink-50 transition">
              Explore Collection →
            </button>
          </div>
          <div className="relative w-full h-[350px] md:h-[450px] mt-10 md:mt-0">
            <Image
              src="/new.png"
              alt="Flower"
              fill
              priority
              className="object-contain"
            />
          </div>
        </section>

        <section id="new-arrivals" className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ NEW ARRIVALS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fresh This Week</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our latest collection of stunning flowers, just arrived and ready to brighten your day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-pink-100">
                <div className="relative h-72 bg-pink-50">
                  <Image
                    src="/images/flower1.png"
                    alt="Pink Rose"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    🎉 NEW
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    25% OFF
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-full bg-white text-pink-500 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-pink-50 transition">
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Pink Rose</h3>
                  <p className="text-gray-500 text-sm mb-3">Fresh, handpicked pink roses</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-500 font-bold text-xl">Rs 150</span>
                    <span className="text-gray-400 line-through text-sm">Rs 200</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★★★★★ <span className="text-gray-500 ml-1">(4.8)</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-pink-100">
                <div className="relative h-72 bg-pink-50">
                  <Image
                    src="/images/flower2.png"
                    alt="Red Rose"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    🎉 NEW
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🔥 HOT
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-full bg-white text-pink-500 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-pink-50 transition">
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Red Rose</h3>
                  <p className="text-gray-500 text-sm mb-3">Symbol of deep love and passion</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-500 font-bold text-xl">Rs 220</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★★★★★ <span className="text-gray-500 ml-1">(5.0)</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-pink-100">
                <div className="relative h-72 bg-pink-50">
                  <Image
                    src="/images/flower3.png"
                    alt="Lilly Rose Mix"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    🎉 NEW
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-full bg-white text-pink-500 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-pink-50 transition">
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Lilly Rose Mix</h3>
                  <p className="text-gray-500 text-sm mb-3">Beautiful blend of lilies and roses</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-500 font-bold text-xl">Rs 200</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★★★★★ <span className="text-gray-500 ml-1">(4.9)</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-pink-100">
                <div className="relative h-72 bg-pink-50">
                  <Image
                    src="/images/flower4.png"
                    alt="Lilly Pink Rose"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    🎉 NEW
                  </div>
                  <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    LIMITED
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-full bg-white text-pink-500 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-pink-50 transition">
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Lilly Pink Rose</h3>
                  <p className="text-gray-500 text-sm mb-3">Elegant pink lilies and roses</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-500 font-bold text-xl">Rs 250</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    ★★★★★ <span className="text-gray-500 ml-1">(4.7)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="/dashboard"
                onClick={handleViewAllClick}
                className="inline-block px-8 py-3 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition font-semibold shadow-md cursor-pointer"
              >
                View All New Arrivals →
              </a>
            </div>
          </div>
        </section>

        <section id="collections" className="py-16 md:py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Collections</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our beautiful selection of fresh flowers, carefully curated for every occasion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="relative h-48 bg-pink-50">
                  <Image
                    src="/images/flower5.png"
                    alt="Pink White Tulip"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    25% OFF
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pink White Tulip</h3>
                  <p className="text-gray-600 text-sm mb-3">Beautiful pink and white tulips</p>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500 font-semibold">From Rs 150</span>
                    <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm">
                      View Collection →
                    </button>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="relative h-48 bg-pink-50">
                  <Image
                    src="/images/flower6.png"
                    alt="White Tulip"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">White Tulip</h3>
                  <p className="text-gray-600 text-sm mb-3">Elegant pure white tulips</p>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500 font-semibold">From Rs 200</span>
                    <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm">
                      View Collection →
                    </button>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="relative h-48 bg-pink-50">
                  <Image
                    src="/images/flower7.png"
                    alt="Baby's Breath"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Baby's Breath</h3>
                  <p className="text-gray-600 text-sm mb-3">Delicate white baby's breath</p>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500 font-semibold">From Rs 220</span>
                    <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm">
                      View Collection →
                    </button>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="relative h-48 bg-pink-50">
                  <Image
                    src="/images/flower8.png"
                    alt="Blue Baby's Breath"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Blue Baby's Breath</h3>
                  <p className="text-gray-600 text-sm mb-3">Rare blue baby's breath flowers</p>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500 font-semibold">From Rs 160</span>
                    <button className="text-pink-500 hover:text-pink-600 font-semibold text-sm">
                      View Collection →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Flowers</h3>

              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src="/images/flower1.png"
                        alt="Pink Rose"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        25% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">Beautiful Rose</h4>
                      <p className="text-xs text-gray-500 mb-3">Fresh, handpicked roses</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-500 font-bold text-lg">Rs 150</span>
                        <span className="text-gray-400 line-through text-sm">Rs 200</span>
                      </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src="/images/flower2.png"
                        alt="Red Rose"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">Fresh Lily</h4>
                      <p className="text-xs text-gray-500 mb-3">Elegant white lilies</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-500 font-bold text-lg">Rs 200</span>
                      </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src="/images/flower3.png"
                        alt="Lilly Rose Mix"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        18% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">Sunflower</h4>
                      <p className="text-xs text-gray-500 mb-3">Bright and cheerful</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-500 font-bold text-lg">Rs 180</span>
                        <span className="text-gray-400 line-through text-sm">Rs 220</span>
                      </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src="/images/flower4.png"
                        alt="Lilly Pink Rose"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        NEW
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">Orchid</h4>
                      <p className="text-xs text-gray-500 mb-3">Exotic and elegant</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-500 font-bold text-lg">Rs 250</span>
                      </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-64 bg-pink-50">
                      <Image
                        src="/images/flower5.png"
                        alt="Pink White Tulip"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1">Pink Peony</h4>
                      <p className="text-xs text-gray-500 mb-3">Soft romantic peonies</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-pink-500 font-bold text-lg">Rs 220</span>
                      </div>
                      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/dashboard"
                onClick={handleViewAllClick}
                className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-semibold shadow-md cursor-pointer"
              >
                View All Collections →
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bringing Beauty to Your Life Since 2010
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Welcome to our flower shop, where passion meets petals. Since 2010, we've been dedicated to bringing the beauty of nature into your life through our carefully curated selection of fresh, vibrant flowers.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  What started as a small family business has blossomed into a beloved destination for flower lovers across the region. Every bloom we offer is handpicked with care, ensuring that only the freshest and most beautiful flowers reach your hands.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe that flowers have the power to brighten any moment, celebrate every occasion, and express emotions that words sometimes cannot.
                </p>
              </div>
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                  <span className="text-8xl">🌹</span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Our Values</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-xl bg-pink-50 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">🌸</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Quality First</h4>
                  <p className="text-gray-600">
                    We handpick every flower to ensure only the freshest, most beautiful blooms reach you.
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl bg-rose-50 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">💝</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Customer Love</h4>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. We go above and beyond to make every customer feel special.
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl bg-pink-50 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">🌿</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Sustainability</h4>
                  <p className="text-gray-600">
                    We're committed to eco-friendly practices to protect our beautiful planet.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Why Choose Us</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">✨</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Fresh Daily Delivery</h4>
                    <p className="text-gray-600 text-sm">We receive fresh flowers every day to ensure maximum freshness.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">🎨</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Expert Florists</h4>
                    <p className="text-gray-600 text-sm">Our skilled florists create stunning arrangements with attention to detail.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">💰</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Best Prices</h4>
                    <p className="text-gray-600 text-sm">Premium quality at affordable prices with regular discounts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">🚚</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Fast Delivery</h4>
                    <p className="text-gray-600 text-sm">Same-day delivery available to bring joy to your doorstep quickly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">🎁</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Custom Arrangements</h4>
                    <p className="text-gray-600 text-sm">Personalized bouquets tailored to your preferences and occasions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">24/7 Support</h4>
                    <p className="text-gray-600 text-sm">Our friendly team is always here to help with your questions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                  <div className="text-sm md:text-base">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                  <div className="text-sm md:text-base">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                  <div className="text-sm md:text-base">Flower Varieties</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                  <div className="text-sm md:text-base">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-b from-pink-50 to-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Have a question or special request? We'll get back to you within 24 hours.
                </p>

                {submitted && (
                  <div className="bg-green-50 border-l-4 border-green-400 text-green-800 px-5 py-4 rounded-lg mb-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm">We'll respond to you shortly.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition bg-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition bg-white"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition bg-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Question</option>
                        <option value="custom">Custom Arrangement</option>
                        <option value="wedding">Wedding Flowers</option>
                        <option value="corporate">Corporate Events</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-300 focus:outline-none transition resize-none bg-white"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-300 hover:bg-pink-400 text-white font-semibold py-4 px-6 rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-pink-300 to-rose-200 rounded-2xl p-6 text-white shadow-md">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm opacity-90">Phone</p>
                      <p className="font-semibold text-sm">{CONTACT_SETTINGS.contact.phone.main}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm opacity-90">Email</p>
                      <p className="font-semibold text-sm">{CONTACT_SETTINGS.contact.email.info}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-50 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Visit Us</h3>
                    <p className="text-gray-600 text-sm">{CONTACT_SETTINGS.contact.address.street}</p>
                    <p className="text-gray-600 text-sm">
                      {CONTACT_SETTINGS.contact.address.city}, {CONTACT_SETTINGS.contact.address.state} {CONTACT_SETTINGS.contact.address.zip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-50 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2">Hours</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mon-Fri</span>
                        <span className="font-semibold text-gray-800">{CONTACT_SETTINGS.contact.hours.weekday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sat</span>
                        <span className="font-semibold text-gray-800">{CONTACT_SETTINGS.contact.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sun</span>
                        <span className="font-semibold text-gray-800">{CONTACT_SETTINGS.contact.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="grid grid-cols-4 gap-2">
                  <a href={CONTACT_SETTINGS.social.facebook} className="bg-pink-50 hover:bg-pink-300 p-2 rounded-lg transition flex items-center justify-center group">
                    <svg className="w-5 h-5 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href={CONTACT_SETTINGS.social.instagram} className="bg-pink-50 hover:bg-pink-300 p-2 rounded-lg transition flex items-center justify-center group">
                    <svg className="w-5 h-5 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href={CONTACT_SETTINGS.social.twitter} className="bg-pink-50 hover:bg-pink-300 p-2 rounded-lg transition flex items-center justify-center group">
                    <svg className="w-5 h-5 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href={CONTACT_SETTINGS.social.pinterest} className="bg-pink-50 hover:bg-pink-300 p-2 rounded-lg transition flex items-center justify-center group">
                    <svg className="w-5 h-5 text-pink-500 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}