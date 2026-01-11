"use client";

import Link from "next/link";
import ParticleBackground from "../../../components/ParticleBackground";

export default function CategoryPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col">
        {/* Top nav to stay consistent with other pages if needed */}
        <header className="flex items-center justify-between px-8 sm:px-16 pt-6 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          <Link href="/home" className="font-semibold">
            Blog
          </Link>
          <nav className="flex gap-8">
            <Link href="/post" className="hover:text-gray-300">
              All Posts
            </Link>
            <Link href="/category" className="hover:text-gray-300">
              Categories
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>
        </header>

        {/* Centered tiles */}
        <main className="flex-1 flex items-center justify-center px-4 pb-12 mt-16 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl w-full">
            {/* BLOGS tile */}
            <Link
              href="/post"
              className="group bg-gray-200/90 text-black flex items-center justify-center h-[260px] sm:h-[320px] md:h-[380px] transition-transform transition-colors duration-300 hover:-translate-y-2 hover:bg-gray-100/95"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl tracking-[0.35em] uppercase">
                Blogs
              </span>
            </Link>

            {/* PRODUCTS tile */}
            <Link
              href="/products"
              className="group bg-gray-200/90 text-black flex items-center justify-center h-[260px] sm:h-[320px] md:h-[380px] transition-transform transition-colors duration-300 hover:-translate-y-2 hover:bg-gray-100/95"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl tracking-[0.35em] uppercase">
                Products
              </span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
