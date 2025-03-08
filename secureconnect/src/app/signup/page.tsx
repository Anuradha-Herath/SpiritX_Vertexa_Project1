'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async (data: { username: string; password: string; confirmPassword: string }) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(responseData.message || 'An error occurred during signup');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">Account created successfully! Redirecting to login...</p>
          </div>
        )}
        
        {!success && <SignupForm onSubmit={handleSignup} />}
        
        {!success && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        )}
        
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-gray-800">Creating your account...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;