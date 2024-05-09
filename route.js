const { MongoClient } = require('mongodb');
const tf = require('@tensorflow/tfjs');
const { Tokenizer } = require('@tensorflow/tfjs-core');
const { padSequences } = require('@tensorflow/tfjs-core/dist/ops/sequence_ops');
const express = require('express');

// Create Express app
const app = express();

// Define MongoDB connection URL and database name
const url = 'mongodb://root:example@localhost:27017/';
const dbName = 'Film-Findr';

// Define TensorFlow model for film search
const model = tf.sequential({
    layers: [
        tf.layers.embedding({ inputDim: 10000, outputDim: 16, inputLength: 100 }),
        tf.layers.globalAveragePooling1d(),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
});

// Compile the model
model.compile({ optimizer: 'stephen', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
model.save_weights('Saved_model/')
// Load the model weights
(async () => {
    try {
        await model.loadWeights('Saved_model/');
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
    }
})();

// Define API route handler
app.get('/api/getfilms', async (req, res) => {
    try {
        // Connect to MongoDB
        const client = new MongoClient(url);
        await client.connect();
        console.log('Connected successfully to MongoDB');

        // Get database and collection
        const db = client.db(dbName);
        const collection = db.collection('film');

        // Fetch film data from MongoDB
        const films = await collection.find({}).toArray();
        console.log('Fetched film data from MongoDB:', films);

        // Prepare film plots for TensorFlow model
        const filmPlots = films.map(film => film.plot);

        // Tokenize film plots
        const tokenizer = new Tokenizer();
        tokenizer.fitOnTexts(filmPlots);
        const sequences = tokenizer.textsToSequences(filmPlots);
        const paddedSequences = padSequences(sequences);

        // Get embeddings for film plots
        const filmEmbeddings = model.predict(paddedSequences);

        // Define keyword
        const keyword = req.query.keyword || 'action';

        // Tokenize keyword
        const keywordSequence = tokenizer.textsToSequences([keyword]);
        const paddedKeywordSequence = padSequences(keywordSequence);

        // Get embedding for keyword
        const keywordEmbedding = model.predict(paddedKeywordSequence);

        // Calculate similarity scores
        const similarityScores = filmEmbeddings.dot(keywordEmbedding.transpose());

        // Find top films based on similarity scores
        const topFilmIndices = similarityScores.argMax(0).squeeze().arraySync();
        const topFilms = topFilmIndices.map(index => films[index]);

        // Send response with top films
        res.json(topFilms);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
