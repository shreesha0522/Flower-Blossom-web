"use client";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[400px] bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">About Us</h1>
            <p className="text-xl text-gray-600">Bringing Beauty to Your Life Since 2010</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Welcome to our flower shop, where passion meets petals. Since 2010, we've been dedicated to bringing the beauty of nature into your life through our carefully curated selection of fresh, vibrant flowers.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                What started as a small family business has blossomed into a beloved destination for flower lovers across the region. Every bloom we offer is handpicked with care, ensuring that only the freshest and most beautiful flowers reach your hands.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that flowers have the power to brighten any moment, celebrate every occasion, and express emotions that words sometimes cannot. That's why we're committed to providing not just flowers, but unforgettable experiences.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-200 flex items-center justify-center">
                <span className="text-6xl">🌹</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-pink-50 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🌸</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We handpick every flower to ensure only the freshest, most beautiful blooms reach you. Quality is never compromised.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-rose-50 hover:shadow-lg transition">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Customer Love</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We go above and beyond to make every customer feel special and valued.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-pink-50 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices, from sourcing to packaging, to protect our beautiful planet.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Fresh Daily Delivery</h3>
                <p className="text-gray-600">We receive fresh flowers every day to ensure maximum freshness and longevity.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">🎨</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Florists</h3>
                <p className="text-gray-600">Our skilled florists create stunning arrangements with attention to every detail.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
                <p className="text-gray-600">Premium quality at affordable prices, with regular discounts and special offers.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">🚚</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Same-day delivery available to bring joy to your doorstep quickly and safely.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">🎁</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Custom Arrangements</h3>
                <p className="text-gray-600">Personalized bouquets tailored to your preferences and special occasions.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-pink-100 hover:border-pink-300 transition">
              <div className="text-3xl">💬</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our friendly team is always here to help with your questions and orders.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-6xl">
                👨‍💼
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">John Smith</h3>
              <p className="text-pink-600 font-semibold mb-2">Founder & CEO</p>
              <p className="text-gray-600">Passionate about flowers with 15+ years of experience in the floral industry.</p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center text-6xl">
                👩‍🎨
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sarah Johnson</h3>
              <p className="text-pink-600 font-semibold mb-2">Head Florist</p>
              <p className="text-gray-600">Award-winning florist specializing in creative and elegant arrangements.</p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Mike Wilson</h3>
              <p className="text-pink-600 font-semibold mb-2">Customer Relations</p>
              <p className="text-gray-600">Dedicated to ensuring every customer has an exceptional experience.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-12 text-white mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-xl">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-xl">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl">Flower Varieties</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl">Customer Support</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Let's Bloom Together</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're celebrating a special moment or just want to brighten someone's day, we're here to help you find the perfect flowers.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg">
              Shop Now
            </button>
            <button className="bg-white hover:bg-gray-50 text-pink-600 border-2 border-pink-500 px-8 py-4 rounded-full font-bold text-lg transition shadow-lg">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}