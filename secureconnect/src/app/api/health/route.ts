import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  return NextResponse.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: dbStatus
  });
}
