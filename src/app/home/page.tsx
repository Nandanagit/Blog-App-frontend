'use client';

import React, { useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ParticleBackground from "../../../components/ParticleBackground";

interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/posts', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching posts');
        } else {
          setError('Error fetching posts');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden overflow-y-auto">
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-black border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-[0.25em] uppercase text-sm">
              BLOG
            </Link>
            <nav className="hidden sm:flex gap-8 text-xs tracking-[0.25em] uppercase">
              <Link href="/auth/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link href="/post" className="hover:text-gray-200">
                All Posts
              </Link>
              <Link href="/category" className="hover:text-gray-200">
                Categories
              </Link>
              <Link href="/about" className="hover:text-gray-200">
                About
              </Link>
              <Link href="#" className="hover:text-gray-200">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero section with particles background */}
          <section className="relative h-[320px] border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <ParticleBackground />
            </div>
            <div className="relative z-10 mx-auto max-w-6xl px-4 h-full flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 flex flex-col justify-center space-y-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-gray-200">Blog</p>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.08em] leading-tight">
                  EXPLORE NEW
                  <br />
                  IDEAS
                </h1>
                <p className="text-sm md:text-base text-gray-200 max-w-xl">
                  Discover fresh perspectives, deep dives, and stories from our community of writers.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8 flex justify-center md:justify-end flex-1">
                <div className="relative w-52 h-52 md:w-64 md:h-64">
                  <Image
                    src="/pic.png"
                    alt="Hero graphic"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Posts section */}
          <section className="bg-[#5b5353] py-16">
            <div className="mx-auto max-w-6xl px-4">
              {loading && <p className="text-sm text-gray-300">Loading posts...</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}

              {!loading && !error && posts.length === 0 && (
                <p className="text-sm text-gray-300">No posts found.</p>
              )}

              <div className="mt-10 flex flex-wrap justify-center gap-10">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="w-60 h-72 bg-white text-black shadow-md flex flex-col items-center justify-center px-4 text-center"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-2">Post</p>
                    <h2 className="text-sm font-semibold line-clamp-3 mb-2">{post.title}</h2>
                    <p className="text-xs text-gray-600 line-clamp-4 mb-4 whitespace-pre-wrap">{post.body}</p>
                    <Link href={`/post/${post.id}`} className="text-[11px] uppercase tracking-[0.25em] underline">
                      Open
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Publish your blog call-to-action */}
          <section className="relative bg-black py-20 border-t border-white/10 flex items-center justify-center">
            <div className="mx-auto max-w-4xl px-4 w-full flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
                  if (token) {
                    router.push('/create');
                  } else {
                    router.push('/auth/login');
                  }
                }}
                className="block w-full md:w-[640px] bg-white text-black text-center py-10 text-lg md:text-2xl tracking-[0.18em] uppercase shadow-lg transform transition-transform duration-200 hover:scale-105"
              >
                Publish Your Blog
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black py-6 text-xs text-gray-300">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.3em] text-[10px] mb-1">Owner of the website</p>
              <p className="text-sm">nandanakamundayil@gmail.com</p>
            </div>
            <div className="flex flex-col md:items-end text-sm space-y-1 break-all">
              <a
                href="https://linkedin.com/in/nandanapradeep"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white underline-offset-2 hover:underline"
              >
                linkedin.com/in/nandanapradeep/
              </a>
              <a
                href="https://github.com/Nandanagi"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white underline-offset-2 hover:underline"
              >
                github.com/Nandanagi
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
