'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is already logged in
    const username = localStorage.getItem('username');
    if (username) {
      router.push('/welcome');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Secure Connect</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}