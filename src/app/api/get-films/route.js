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

        const answers = [];

        for (const question of questions) {
            const movieTitle = question.movieTitle;
            const questionText = question.question;

            // Retrieve movie information (context) from the database
            const movie = await collection.findOne({ title: movieTitle });

            if (movie) {
                const context = `Title: ${movie.title}, Plot: ${movie.plot}`;

                // Generate answer using question-answering model
                const answer = await model.findAnswers(questionText, context);

                answers.push({ question: questionText, answer });
            } else {
                answers.push({ question: questionText, answer: "Movie not found" });
            }
        }

        return answers;
    } catch (error) {
        console.error("Error:", error);
        return [];
    } finally {
        await client.close();
    }
}

// Example usage:
const questions = [
    { movieTitle: "Spider-Man", question: "What is the title of the film?" },
    { movieTitle: "Spider-Man", question: "What is the plot of the film?" },
    { movieTitle: "Titanic", question: "Who directed the film?" },
    // Add more questions as needed
];

answerQuestions(questions)
    .then(answers => console.log(answers))
    .catch(error => console.error(error));
