import * as qna from "@tensorflow-models/qna"
import * as tf from "@tensorflow/tfjs-node"
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import {MongoClient} from "mongodb"

export async function GET(request, response) {
    const {MongoClient} = require("mongodb")
    const url = "mongodb+srv://film-findr:EBgb342FUad2oLnt@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(url)
    await client.connect()

    const databaseName = "film-findr"
    const db = client.db(databaseName)
    const collection = db.collection("film")
    const data = await collection.find({}).toArray()

    const question = "What is the title of the film about the man with spider-powers?"
    //const context = JSON.stringify(data)
    const context = "Title: Spider-Man, Plot: A man with spider-powers does stuff"
    const model = await qna.load()

    console.log("Model is loaded")
    const answers = await model.findAnswers(question, context)

    return Response.json(answers)
}