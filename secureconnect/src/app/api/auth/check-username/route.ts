import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if username exists
    const existingUser = await User.findOne({ username });
    
    return NextResponse.json({
      available: !existingUser,
      message: existingUser ? 'Username is already taken' : 'Username is available'
    });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      { message: 'An error occurred while checking username availability' },
      { status: 500 }
    );
  }
}
