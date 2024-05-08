import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const databaseName = "film-findr";
const PAGE_SIZE = 10;

const preprocessQuery = (query) => {
    const tokens = query.toLowerCase().split(' ');
    const stopWords = ['a', 'an', 'the', 'is', 'in', 'of', 'and', 'or', 'with'];
    const filteredTokens = tokens.filter(token => !stopWords.includes(token));
    return filteredTokens.join(' ');
};

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/api/getfilms', async (req, res) => {
    try {
        console.log("Received request to fetch films:", req.query);
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        const db = client.db(databaseName);
        const collection = db.collection("film");
        const { query, page } = req.query;
        const processedQuery = preprocessQuery(query);
        console.log("Processed query:", processedQuery);
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * PAGE_SIZE;
        const movies = await collection.find({ $text: { $search: processedQuery } }).skip(skip).limit(PAGE_SIZE).toArray();
        console.log("Found movies:", movies);
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
