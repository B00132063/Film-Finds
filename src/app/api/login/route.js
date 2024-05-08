// Import the MongoClient class from the 'mongodb' module
import { MongoClient } from 'mongodb';

// Define an asynchronous function to handle login requests
export default async function loginHandler(req, res) {
  // Log a message indicating that the login API page is accessed
  console.log("In the login api page");

  // Extract username and password from the request query parameters
  const { username, password } = req.query;

  // MongoDB connection string
  const url = 'mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  // Create a new MongoClient instance with the provided URL
  const client = new MongoClient(url);

  // Database name
  const dbName = 'film-findr';

  try {
    // Connect to the MongoDB server
    await client.connect();
    // Log a success message upon successful connection
    console.log('Connected successfully to server');

    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Find a document with the provided username and password in the 'login' collection
    const findResult = await collection.findOne({ "username": username, "password": password });

    // If a document is found, respond with 'valid', otherwise respond with 'notvalid'
    if (findResult) {
      res.status(200).json({ "data": "valid" });
    } else {
      res.status(200).json({ "data": "notvalid" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    // Respond with an internal server error status and message
    res.status(500).json({ "error": "Internal server error" });
  } finally {
    // Close the MongoClient connection in all cases
    await client.close();
  }
}
