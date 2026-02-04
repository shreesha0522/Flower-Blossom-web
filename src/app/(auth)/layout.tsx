<<<<<<< HEAD
"use client";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Left side - Illustration */}
          <div className="bg-gradient-to-br from-pink-300 to-pink-400 p-12 flex flex-col items-center justify-center text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Flower Blossom</h2>
              <p className="text-pink-50 text-sm max-w-xs">
                Experience the beauty of fresh flowers delivered to your doorstep
              </p>
            </div>
            
            {/* Illustration placeholder */}
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-8 bg-white/30 rounded-full animate-pulse delay-75"></div>
              <div className="absolute inset-16 bg-white/40 rounded-full animate-pulse delay-150"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">🌸</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white p-12 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
=======
// app/layout.tsx
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen w-screen relative">
      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/picture2.jpg"  // your full background image
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* CENTERED FORM */}
      <div className="flex h-full w-full items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 rounded-xl p-6 shadow-lg">
          {children}
        </div>
      </div>
    </section>
  );
}
>>>>>>> origin/main
