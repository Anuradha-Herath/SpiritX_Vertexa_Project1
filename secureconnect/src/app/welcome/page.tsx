'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WelcomePage = () => {
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setUsername(user);
        } else {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            // First, call the logout API to clear the HTTP-only cookie
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                console.error('Logout API failed');
            }
            
            // Then, clear the username from localStorage
            localStorage.removeItem('username');
            
            // Finally, redirect to login page
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still try to redirect even if the API call fails
            localStorage.removeItem('username');
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Hello, {username}!</h1>
            <div className="mt-4 flex flex-col gap-2 items-center">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Logout
                </button>
                
                <Link href="/signup" className="text-blue-500 hover:underline mt-2">
                    Create another account
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;