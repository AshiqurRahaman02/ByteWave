import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoURL: string = process.env.MONGO_URL!;

const connection = mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

export default connection;
