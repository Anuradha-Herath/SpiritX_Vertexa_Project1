'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-8">Page not found</p>
      <Link href="/">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
}
