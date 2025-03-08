import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: Request) {
  try {
    console.log('Login request received');
    
    // Connect to database
    await dbConnect();
    
    // Parse request body
    const body = await request.json();
    const { username, password } = body;
    
    console.log(`Login attempt for username: ${username}`);
    
    // Validate inputs
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Find user in database
    const user = await User.findOne({ username });
    
    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      console.log(`Login failed for username: ${username}`);
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set token in HTTP-only cookie
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    console.log(`Login successful for username: ${username}`);
    
    // Return success response with user info (without password)
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}