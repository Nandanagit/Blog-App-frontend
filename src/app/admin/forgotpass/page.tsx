'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSent(false);
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      const res = await fetch('https://nandana-blog-backend.vercel.app/api/admin/request-password-reset', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }
      
      setSent(true);
      setEmail(''); // Clear the email field after successful submission
      window.alert('Email sent! Please check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process your request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-gray-400">Enter your email to reset your password</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Send Reset Link
            </button>
            {sent && (
              <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm text-center">
                Reset link sent! Please check your email.
              </div>
            )}
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}
          </form>
          <div className="mt-6 text-center">
            <Link href="/admin/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
