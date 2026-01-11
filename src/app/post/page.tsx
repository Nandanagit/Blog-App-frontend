'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ParticleBackground from "../../../components/ParticleBackground";

interface Post {
  id: string;
  title: string;
  body: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:7000/posts', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
        console.log('Posts state:', data.posts || data);
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
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/80 border-b border-white/10 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-[0.25em] uppercase text-sm">
              BLOG
            </Link>
            <nav className="hidden sm:flex gap-8 text-xs tracking-[0.25em] uppercase">
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

        {/* Content */}
        <main className="flex-1">
          <section className="mx-auto max-w-6xl px-4 pt-12 pb-20">
            <h1 className="text-center text-sm md:text-base tracking-[0.35em] uppercase mb-12">
              Explore new ideas and products from the blogs posted in the website.
            </h1>

            {loading && <p className="text-center text-sm text-gray-300">Loading posts...</p>}
            {error && <p className="text-center text-sm text-red-400">{error}</p>}

            {!loading && !error && posts.length === 0 && (
              <p className="text-center text-sm text-gray-300">No posts found.</p>
            )}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="w-60 h-72 bg-[#f5f5f5] text-black shadow-md flex flex-col items-center justify-center px-4 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-2">Post</p>
                  <h2 className="text-sm font-semibold mb-2 line-clamp-3">{post.title}</h2>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-4 whitespace-pre-wrap">{post.body}</p>
                  <Link
                    href={`/post/${post.id}`}
                    className="text-[11px] uppercase tracking-[0.25em] underline"
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PostsPage;
