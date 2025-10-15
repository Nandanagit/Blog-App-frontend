'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
        const res = await fetch('http://localhost:7000/posts');
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
      } catch (err: any) {
        setError(err.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <h1>All Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {posts.length === 0 && !loading && !error && <p>No posts found.</p>}
        {posts.map(post => (
          <div key={post.id} style={{ padding: 20, borderRadius: 8, background: '#fafafa', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <Link href={`/post/${post.id}`}>

              
                <h2 style={{ margin: 0, color: '#000' }}>{post.title}</h2>
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
