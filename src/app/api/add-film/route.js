// Import the MongoClient class from the "mongodb" module
import { MongoClient } from "mongodb";

// Define an asynchronous function to handle GET requests
export async function GET(request, response) {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url);

    // Retrieve the film title from the search parameters
    const filmTitle = searchParams.get("film-title");

    // Construct the API link to fetch film data
    const apiLink = `https://www.omdbapi.com/?apikey=1012eb79&t=${filmTitle}&plot=full&r=json`;

    // Fetch data from the OMDB API
    const response2 = await fetch(apiLink);
    const data = await response2.json();

    // Check if the film is found
    if (data.response === "False")
        return Response.json({ "message": "Sorry, the film '" + filmTitle +
                "' was not able to be found." });
    else {
        // Import MongoClient again for usage in this scope
        const { MongoClient } = require("mongodb");

        // MongoDB connection string
        const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        // Create a new MongoClient instance and connect to MongoDB Atlas
        const client = new MongoClient(url);
        await client.connect();

        // Access the database and collection
        const databaseName = "film-findr";
        const database = client.db(databaseName);
        const collection = database.collection("film");

        // Check if the film already exists in the database
        const checkFilm = await collection.find({ "title": data.Title }).toArray();

        // If the film exists, return a message indicating so; otherwise, insert it into the database
        if (checkFilm.length > 0)
            return Response.json({ "message": "Sorry, the film '" + data.Title +
                    "' has already been added to the database." });
        else {
            // Insert film data into the collection
            await collection.insertOne({
                "title": data.Title, "year": data.Year, "rated": data.Rated, "released": data.Released,
                "runtime": data.Runtime, "genre": data.Genre, "director": data.Director,
                "writer": data.Writer, "actors": data.Actors, "plot": data.Plot, "language": data.Language,
                "country": data.Country, "awards": data.Awards, "poster": data.Poster
            });

            // Return a success message
            return Response.json({ "message": "Success! The film '" + data.Title +
                    "' was added to the database." });
        }
    }
}
