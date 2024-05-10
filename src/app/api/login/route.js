// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const url = 'mongodb://localhost:27017';
const dbName = 'Film-Findr';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint for login verification
app.post('/api/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Connect to MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Find user with the provided username and password
    const user = await collection.findOne({ username, password });

    // Check if user exists
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
