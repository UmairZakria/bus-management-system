import mongoose from 'mongoose';

const uri ='mongodb://localhost:27017/bms';

if (!uri) {
  throw new Error('Please add your MongoDB URI to the .env file');
}

let isConnected = false;

export async function connectMongo() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
}
