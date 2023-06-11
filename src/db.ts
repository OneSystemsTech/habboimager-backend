import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | undefined; // Declare the variable to hold the database instance

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('imager'); // Assign the database instance to the db variable
    await db.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

export { connectToDatabase, closeDatabaseConnection, db };
