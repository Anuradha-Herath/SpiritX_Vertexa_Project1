import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: Request) {
  try {
    console.log('Signup request received');
    
    // Connect to database
    await dbConnect();
    
    // Parse request body
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body));
    const { username, password, confirmPassword } = body;
    
    // Validate inputs
    if (!username || !password || !confirmPassword) {
      console.log('Missing required fields');
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    console.log('Checking if user exists:', username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists');
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }
    
    // Create new user
    console.log('Creating new user:', username);
    try {
      const user = await User.create({
        username,
        password, // Password will be hashed via the pre-save hook
      });
      console.log('User created successfully:', user._id);
    } catch (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { message: `Error creating user: ${userError.message}` },
        { status: 500 }
      );
    }
    
    console.log('Signup successful');
    // Create token (but don't set it on signup - user needs to login)
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: `An error occurred during signup: ${error.message}` },
      { status: 500 }
    );
  }
}