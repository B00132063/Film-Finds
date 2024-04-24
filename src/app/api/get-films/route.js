import * as qna from "@tensorflow-models/qna";
import { MongoClient } from "mongodb";

export async function answerQuestions(questions) {
    const url = "mongodb://localhost:27017"; // MongoDB connection URL
    const client = new MongoClient(url);

    try {
        await client.connect();

        const databaseName = "movies";
        const db = client.db(databaseName);
        const collection = db.collection("films");

        const model = await qna.load();

        const films = [];

        for (const question of questions) {
            const questionText = question.question;

            // Generate answer using question-answering model
            const answer = await model.findAnswers(questionText, "");

            if (answer && answer.length > 0) {
                // Extract movie title from the answer
                const movieTitle = answer[0].text;

                // Retrieve movie information from the database based on the movie title
                const movie = await collection.findOne({ title: movieTitle });

                if (movie) {
                    films.push(movie);
                }
            }
        }

        return films;
    } catch (error) {
        console.error("Error:", error);
        return [];
    } finally {
        await client.close();
    }
}

// Example usage:
const questions = [
    { question: "What is the title of the film Spider-Man?" },
    { question: "What is the plot of the film Titanic?" },
    { question: "What is the title of the movie where a young boy finds a mysterious alien device?" },
    { question: "Name the movie where a computer hacker learns about the true nature of his reality." },
    { question: "What is the title of the movie about a retired CIA agent who travels across Europe to save his kidnapped daughter?" },
    // Add more questions as needed
];

answerQuestions(questions)
    .then(films => console.log(films))
    .catch(error => console.error(error));
