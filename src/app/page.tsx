'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (showLogin) {
      router.push("/auth/login");
    }
  }, [showLogin, router]);
    
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '0 6px 32px rgba(34, 145, 188, 0.11)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-80px',
        left: '-80px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, #333 60%, #555 100%)',
        borderRadius: '50%',
        zIndex: 0,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '260px',
        height: '260px',
        background: 'radial-gradient(circle, #555 60%, #333 100%)',
        borderRadius: '50%',
        zIndex: 0,
        opacity: 0.5,
      }} />
      <div style={{
        background: '#333',
        padding: '2.5rem 3.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 6px 32px rgba(58, 56, 56, 0.11)',
        position: 'relative',
        zIndex: 1,
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: '2.7rem', marginBottom: '1.1rem', fontWeight: 800, letterSpacing: 1 }}>Welcome to Blog Application</h1>
        <p style={{ fontSize: '1.22rem', marginBottom: '2rem', fontWeight: 500 }}>
          Your colourful space to share stories, ideas, and inspiration.
        </p>
        <ul style={{ textAlign: 'left', marginBottom: '2.3rem', fontWeight: 500 }}>
          <li style={{ color: 'white' }}>✨ Read and discover amazing blog posts</li>
          <li style={{ color: 'white' }}>📝 Write and publish your own articles</li>
          <li style={{ color: 'white' }}>💬 Connect with a community of readers and writers</li>
        </ul>
        <a href="/about" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#fff',
          color: '#333',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background 0.2s',
          marginBottom: '1.3rem',
        }}>Learn More About Us</a>
        <br />
        <button
          onClick={() => setShowLogin(true)}
          style={{
            marginTop: '1.2rem',
            padding: '0.7rem 2.2rem',
            background: '#fff',
            color: '#333',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(255,255,255,0.15)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}