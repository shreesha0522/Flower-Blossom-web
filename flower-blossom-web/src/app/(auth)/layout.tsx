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
