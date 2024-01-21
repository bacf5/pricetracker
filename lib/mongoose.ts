import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (isConnected) return console.log('=> using existing connection');

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('MongoDB Connected!');
  } catch (error) {
    console.log(error);
  }
};
