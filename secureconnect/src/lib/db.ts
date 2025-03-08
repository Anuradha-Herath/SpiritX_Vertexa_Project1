import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Track connection status
let isConnected = false;

/**
 * Connect to MongoDB
 */
const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    console.log('Using URI:', MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://****:****@'));
    
    const db = await mongoose.connect(MONGODB_URI);
    
    isConnected = !!db.connections[0].readyState;
    
    console.log('MongoDB connected successfully');
    console.log('Connection state:', isConnected ? 'Connected' : 'Disconnected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Error connecting to database');
  }
};

export default dbConnect;
