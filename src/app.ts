import express, { Request, Response } from 'express';
import { connectToDatabase, closeDatabaseConnection, db } from './db';

const app = express();
const port = 1504;

// Initialize the server after the database connection is established
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB. Server not started.');
  }
};

// Route handler for /api/comunidade
app.get('/api/comunidade/all', async (req: Request, res: Response) => {
  try {
    if (!db) {
      throw new Error('Database connection not established.');
    }

    const collection = db.collection('comunidade');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
startServer();

// Gracefully close the database connection on server shutdown
process.on('SIGINT', async () => {
  try {
    await closeDatabaseConnection();
    console.log('Server stopped. MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});
