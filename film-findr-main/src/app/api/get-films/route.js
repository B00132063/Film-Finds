export async function GET(req, res) {
    const {MongoClient} = require("mongodb")
    const url = "mongodb+srv://film-findr:EBgb342FUad2oLnt@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(url)
    await client.connect()

    const databaseName = "film-findr"
    const db = client.db(databaseName)
    const collection = db.collection("film")

    const data = await collection.find({}).toArray()

    return Response.json(data)
}
