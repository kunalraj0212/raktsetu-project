import mongoose from 'mongoose';
import { envConfig } from './envConfig.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
