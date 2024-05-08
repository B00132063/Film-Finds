// Import the MongoClient class from the "mongodb" module
import { MongoClient } from "mongodb";

// Import TensorFlow.js library
import * as tf from '@tensorflow/tfjs';

// Define an asynchronous function to handle GET requests
export async function get(req, res) { // Change "Get" to "get"
    // MongoDB connection string
    const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w&m ajority&appName=Cluster0";

    // Create a new MongoClient instance
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB Atlas
        await client.connect();

        // Access the database and collection
        const databaseName = "film-findr";
        const db = client.db(databaseName);
        const collection = db.collection("film");

        // Extract query parameters from the request
        const { query } = req.query;

        // Preprocess the query before querying MongoDB
        const processedQuery = preprocessQuery(query);

        // Query MongoDB with processed keywords and convert the result to an array
        const movies = await collection.find({ $text: { $search: processedQuery } }).toArray();

        // Send the movies data as a response with status code 200 (OK)
        res.status(200).json(movies);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        // Close the MongoClient connection in all cases
        await client.close();
    }
}

// Function to preprocess the query (placeholder, to be implemented)
const preprocessQuery = (query) => {
    // Return the query as is (placeholder implementation)
    return query;
};
