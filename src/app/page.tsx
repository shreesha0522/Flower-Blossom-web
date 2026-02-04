import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[95%] max-w-7xl">
        
        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-10 py-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-pink-500 font-bold text-xl">
            🌸 <span>Flower Blossom</span>
          </div>

          {/* Menu */}
          <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
            <li className="hover:text-pink-500 cursor-pointer">Home</li>
            <li className="hover:text-pink-500 cursor-pointer">New Arrivals</li>
            <li className="hover:text-pink-500 cursor-pointer">Collections</li>
            <li className="hover:text-pink-500 cursor-pointer">About Us</li>
            <li className="hover:text-pink-500 cursor-pointer">Contact</li>
          </ul>

          {/* Auth buttons */}
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

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-center px-10 py-16">
          
          {/* LEFT CONTENT */}
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

          {/* RIGHT IMAGE */}
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
      </div>
    </main>
  );
}
