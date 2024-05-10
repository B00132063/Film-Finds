// Import the MongoClient class from the "mongodb" module
import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';

// Define an asynchronous function to handle user registration
export async function GET(req, res) {

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    let movies = []

    const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const databaseName = "film-findr";
    // const PAGE_SIZE = 10;

    // console.log("Received request to fetch films:", await req.json());
    await client.connect();
    // console.log("Connected to MongoDB Atlas");
    const db = client.db(databaseName);
    const collection = db.collection("film");

    if(title) {
        movies = await collection.find({
            $or: [
              { title: { $regex: '.*' + title + '.*' }},
              { plot: { $regex: '.*' + title + '.*' }},
            ],
          }).toArray();
    } else {
        movies = await collection.find({}).toArray();
    }

    return NextResponse.json(movies);
}
