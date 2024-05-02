// Import the MongoClient class from the "mongodb" module
import { MongoClient } from "mongodb";

// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Define an asynchronous function to handle user registration
export default async function Register(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        // Extract username, password, and telephone from the request body
        const { username, password, telephone } = req.body;

        // Validate username, password, and telephone (e.g., check for empty values)

        // Hash the password using bcrypt with salt rounds of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // MongoDB connection string
        const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        // Create a new MongoClient instance with the provided URL
        const client = new MongoClient(url);

        try {
            // Connect to the MongoDB server
            await client.connect();

            // Access the specified database and collection
            const databaseName = "film-findr";
            const db = client.db(databaseName);
            const collection = db.collection("login");

            // Check if the user already exists in the database
            const existingUser = await collection.findOne({ username });
            if (existingUser) {
                // If the user already exists, respond with a 400 status and an error message
                return res.status(400).json({ message: 'User already exists' });
            }

            // Insert the new user into the database with hashed password
            await collection.insertOne({ username, password: hashedPassword, telephone });

            // Respond with a success message
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            // Handle any errors that occur during the process
            console.error("Error:", error);
            // Respond with an internal server error status and message
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Close the MongoClient connection in all cases
            await client.close();
        }
    } else {
        // If the request method is not POST, respond with a 405 status and an error message
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
