import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname from the request URL
  const path = request.nextUrl.pathname;
  
  // Define auth-related paths
  const isLoginPage = path === '/login';
  const isSignupPage = path === '/signup';
  const isAuthRequired = !isLoginPage && !isSignupPage && path !== '/';
  
  // Check if user is authenticated by looking for token in cookies
  const token = request.cookies.get('authToken')?.value || '';
  
  // Redirect unauthenticated users to login page if they try to access protected routes
  if (isAuthRequired && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Only redirect authenticated users away from login page (but allow access to signup)
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/welcome', request.url));
  }
  
  return NextResponse.next();
}

// Specify which routes this middleware applies to
export const config = {
  matcher: ['/welcome/:path*', '/login', '/signup', '/']
};