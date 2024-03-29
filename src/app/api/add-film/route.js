import {MongoClient} from "mongodb";

export async function GET(request, response) {
    const {searchParams} = new URL(request.url)

    console.log("one")
    const filmTitle = searchParams.get("film-title")
    const apiLink = `https://www.omdbapi.com/?apikey=1012eb79&t= ${filmTitle}&plot=full&r=json`
    console.log("two")
    const response2 = await fetch(apiLink)
    const data = await response2.json()
    console.log("three")
    console.log(data.Response)
    if (data.Response === "False")
        return Response.json({"message": "Sorry, the film '" + filmTitle +
                "' was not able to be found."})
    else {
        console.log("wagwan")
        const {MongoClient} = require("mongodb")
        const url = "mongodb+srv://film-findr:EBgb342FUad2oLnt@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority"
        const client = new MongoClient(url)
        await client.connect()

        const databaseName = "film-findr"
        const database = client.db(databaseName)
        const collection = database.collection("film")

        const checkFilm = await collection.find({"title": data.Title}).toArray()
        if (checkFilm.length > 0)
            return Response.json({"message": "Sorry, the film '" + data.Title +
                    "' has already been added to the database."})
        else {
            await collection.insertOne({
                "title": data.Title, "year": data.Year, "rated": data.Rated, "released": data.Released,
                "runtime": data.Runtime, "genre": data.Genre, "director": data.Director,
                "writer": data.Writer, "actors": data.Actors, "plot": data.Plot, "language": data.Language,
                "country": data.Country, "awards": data.Awards, "poster": data.Poster
            })

            return Response.json({"message": "Success! The film '" + data.Title +
                    "' was added to the database."})
        }
    }
}
