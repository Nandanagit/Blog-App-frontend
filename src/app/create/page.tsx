'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:7000/posts', {
        method: 'POST',
         headers: {
      "Authorization": "Bearer " + localStorage.getItem('jwt_token'),
      'Content-Type': 'application/json',
    },
        body: JSON.stringify({ title, body }),
      });
      if (res.ok) {
        setMessage('Post created successfully!');
        setTitle('');
        setBody('');
        router.push("/post")
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(data.message || 'Failed to create post.');
      }
    } catch (err) {
      setMessage('Error connecting to backend.');
    }
  };


  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, borderRadius: 8, background: '#8d5f5fff', boxShadow: '0 2px 8px rgba(42, 42, 42, 0.07)', color: '#000' }}>
      <h2 style={{ color: '#000' }}>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, color: '#000' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', color: '#000' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, color: '#000' }}>Content</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            rows={6}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', color: '#000' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 24px', borderRadius: 4, background: '#0070f3', color: '#fff', border: 'none', fontWeight: 'bold' }} onClick={handleSubmit}>
          Create Post
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: 16 }}>{message}</p>}
    </div>
  );
};

export default NewPostPage;
