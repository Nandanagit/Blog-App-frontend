'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-bounce">What do u wanna do today?</h1>
        <p className="text-lg text-gray-400 mb-8">Let's make your day awesome! 🚀</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <Link href="/post" className="group">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:rotate-2 group-hover:shadow-2xl">
            📚 Read Blog
          </button>
        </Link>
        <Link href="/create" className="group">
          <button className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:-rotate-2 group-hover:shadow-2xl">
            ✍️ Publish Blog
          </button>
        </Link>
      </div>
      <div className="mt-16 text-center">
        <span className="text-gray-600 text-sm">Made with <span className="text-pink-400">♥</span> for bloggers</span>
      </div>
    </div>
  );
}
